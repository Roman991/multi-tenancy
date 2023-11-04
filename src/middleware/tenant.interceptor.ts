import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TenantsConfig } from 'src/models/tenants-config.model';
import { TenantConfig } from './tenant-config.dto';

const HEADER_NAME = 'x-tenant-id'; // Replace with the header name you want to check

/**
 * this interceptor checks if a header with tenantId is present and fetches all its configs
 * storing all configs in a hashMap and returns from memory if already fetched
 */
@Injectable()
export class TenantInterceptor implements NestInterceptor {
  tenantsConfigs = new Map<number, TenantConfig>();
  constructor(
    @InjectModel(TenantsConfig)
    private tenantsConfigModel: typeof TenantsConfig,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers[HEADER_NAME]) {
      throw new BadRequestException('Header is missing');
    }
    const tenantId = Number(request.headers[HEADER_NAME]);

    let configs: TenantsConfig[];

    if (this.tenantsConfigs.has(tenantId)) {
      configs = this.tenantsConfigs.get(tenantId).tenantConfigs;
    } else {
      const dbConfigs = await this.tenantsConfigModel.findAll({
        where: {
          tenantId: tenantId,
        },
      });
      this.tenantsConfigs.set(tenantId, {
        tenantId: tenantId,
        tenantConfigs: dbConfigs.map((el) => el.toJSON()),
      });
      // set as current tenant
      configs = this.tenantsConfigs.get(tenantId).tenantConfigs;
    }

    if (!configs) {
      throw new NotFoundException('Tenant id not found');
    }
    request['tenant-config'] = configs;
    request['tenant-id'] = tenantId;
    return next.handle();
  }
}
