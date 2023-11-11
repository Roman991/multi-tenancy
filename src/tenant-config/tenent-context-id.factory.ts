import { ContextIdFactory } from '@nestjs/core';

export class TenantContextIdFactory extends ContextIdFactory {
  private static readonly tenantContextMap: Map<number, string> = new Map();

  public static getContextId(tenantId: number): string | undefined {
    return this.tenantContextMap.get(tenantId);
  }

  public static setContextId(tenantId: number, contextId: string): void {
    this.tenantContextMap.set(tenantId, contextId);
  }
}
