import { Injectable, Scope, Inject } from '@nestjs/common';
import { Request } from 'express';
import { TenantContextIdFactory } from './tenent-context-id.factory';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class TenantContextProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getContext(): string {
    const tenantId = this.request.headers['x-tenant-id'];
    if (tenantId) {
      const existingContextId = TenantContextIdFactory.getContextId(+tenantId);
      if (existingContextId) {
        return existingContextId;
      } else {
        const contextId = `tenant-${tenantId}`;
        TenantContextIdFactory.setContextId(+tenantId, contextId);
        return contextId;
      }
    } else {
      return 'default-context';
    }
  }
}
