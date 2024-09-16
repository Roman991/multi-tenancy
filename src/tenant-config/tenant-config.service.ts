import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TenantConfig } from 'src/middleware/tenant-config.dto';
import { TenantsConfig } from 'src/models/tenants-config.model';
import { TenantContextProvider } from 'src/tenant-config/tenant-context.provider';

@Injectable()
export class TenantConfigService {
  constructor(private readonly tenantContextProvider: TenantContextProvider,
    @InjectModel(TenantsConfig)
    private tenantsConfigModel: typeof TenantsConfig,) {}
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

  async getConfig(): Promise<TenantConfig> {
    // async getConfig() {

    const tenantContext = this.tenantContextProvider.getContext();
    const tenantId = +tenantContext.split('-')[1]; // Extract tenantId from contextId


    let configs: TenantsConfig[];
    // let configs: TenantConfig;

    const hasConfig = this.hasConfig(tenantId);
    if (hasConfig) {
     configs = this.get(tenantId).tenantConfigs;
    } else {
      const dbConfigs = await this.tenantsConfigModel.findAll({
        where: {
          tenantId: tenantId,
        },
      });
      if (dbConfigs.length < 1) {
        throw new NotFoundException('Tenant id not found');
      }
      configs = this.set(tenantId, dbConfigs).tenantConfigs;
    }
       const tenantConfigs: TenantConfig = {
        tenantConfigs: configs,
        tenantId: tenantId,
      };
    return tenantConfigs;

  }


}
