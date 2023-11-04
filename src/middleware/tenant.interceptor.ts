import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TenantsConfig } from 'src/models/tenants-config.model';
import { TenantConfig } from './tenant-config.dto';
import { TenantConfigService } from 'src/tenant-config/tenant-config.service';

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
    private tenantConfigService: TenantConfigService,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers[HEADER_NAME]) {
      throw new BadRequestException('Header is missing');
    }
    const tenantId = Number(request.headers[HEADER_NAME]);

    let configs: TenantsConfig[];

    const hasConfig = this.tenantConfigService.hasConfig(tenantId);
    if (hasConfig) {
      configs = this.tenantConfigService.get(tenantId).tenantConfigs;
    } else {
      const dbConfigs = await this.tenantsConfigModel.findAll({
        where: {
          tenantId: tenantId,
        },
      });
      if (dbConfigs.length < 1) {
        throw new NotFoundException('Tenant id not found');
      }
      configs = this.tenantConfigService.store(
        tenantId,
        dbConfigs,
      ).tenantConfigs;
    }

    if (!configs) {
      throw new NotFoundException('Tenant id not found');
    }
    request['tenant-config'] = configs;
    request['tenant-id'] = tenantId;
    return next.handle();
  }
}
