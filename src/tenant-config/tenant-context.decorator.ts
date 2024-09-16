import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TenantContextProvider } from './tenant-context.provider';

export const TenantContext = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const tenantContextProvider = new TenantContextProvider(context.switchToHttp().getRequest());
    return tenantContextProvider.getContext();
  },
);
