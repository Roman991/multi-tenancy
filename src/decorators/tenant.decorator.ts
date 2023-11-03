import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { TenantConfig } from 'src/middleware/tenant-config.dto';

export const Tenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const tenantConfig: TenantConfig = {
      tenantConfigs: req['tenant-config'],
      tenantId: req['tenant-id'],
    };
    return tenantConfig;
  },
);
