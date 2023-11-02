import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Observable } from 'rxjs';
import { TenantsConfig } from 'src/models/tenants-config.model';

@Injectable()
export class TenantConfigInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(TenantsConfig)
    private tenantsConfigModel: typeof TenantsConfig,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const headerName = 'x-tenant-id'; // Replace with the header name you want to check

    if (!request.headers[headerName]) {
      throw new BadRequestException('Header is missing');
    }

    const headerValue = request.headers[headerName];
    const config = this.tenantsConfigModel.findOne({
      where: {
        tenantId: headerValue,
        configName: 'courierFedex',
      },
    });
    if (!config) {
      throw new NotFoundException('Tenant id not found');
    }
    request['tenantConfig'] = config;
    return next.handle();
  }
}
