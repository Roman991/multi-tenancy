import { Injectable, Logger } from '@nestjs/common';
import { TenantConfig } from 'src/middleware/tenant-config.dto';
import { TenantsConfig } from 'src/models/tenants-config.model';

@Injectable()
export class TenantConfigService {
  tenantsConfigs = new Map<number, TenantConfig>();
  private logger = new Logger(TenantConfigService.name);
  constructor() {}

  store(tenantId: number, config: TenantsConfig[]): TenantConfig {
    const configs: TenantConfig = {
      tenantId: tenantId,
      tenantConfigs: config.map((el) => el.toJSON()),
    };
    this.tenantsConfigs.set(tenantId, configs);
    // console.log(this.tenantsConfigs);
    return configs;
  }

  get(tenantId: number) {
    return this.tenantsConfigs.get(tenantId);
  }

  hasConfig(tenantId: number) {
    return this.tenantsConfigs.has(tenantId);
  }
}
