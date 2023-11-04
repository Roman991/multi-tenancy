import { Injectable, Logger } from '@nestjs/common';
import { TenantConfig } from 'src/middleware/tenant-config.dto';
import { TenantsConfig } from 'src/models/tenants-config.model';

@Injectable()
export class TenantConfigService {
  tenantsConfigs = new Map<number, TenantConfig>();
  private logger = new Logger(TenantConfigService.name);

  /**
   * use this method to set or update the tenantId config
   * @param config should be the complete array of all configs for tenant
   */

  set(tenantId: number, config: TenantsConfig[]): TenantConfig {
    const configs: TenantConfig = {
      tenantId: tenantId,
      tenantConfigs: config.map((el) => el.toJSON()),
    };
    this.tenantsConfigs.set(tenantId, configs);
    return configs;
  }

  get(tenantId: number) {
    return this.tenantsConfigs.get(tenantId);
  }

  hasConfig(tenantId: number) {
    return this.tenantsConfigs.has(tenantId);
  }
}
