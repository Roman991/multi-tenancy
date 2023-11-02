import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetTenantConfig = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.tenantConfig;
  },
);
