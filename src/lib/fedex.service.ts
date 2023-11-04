import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TenantConfig } from 'src/middleware/tenant-config.dto';

// This is a shared service for creating shippings with Fedex
// each tenant should pass different credentials (stored in TenantsConfigs table)
// or the service shoud load credentials by itself using the `tenantId` paramenter ... or some other way?
@Injectable()
export class FedexService {
  private _fedexConfig: { user: string; pass: string };

  constructor(tenantConfig: TenantConfig) {
    const { configValue } = tenantConfig.tenantConfigs.find(
      (el) => el.configName === 'courierFedex',
    );
    if (!configValue) {
      throw new Error('No config for courierFedex');
    }

    this._fedexConfig = configValue;
  }

  async createShipping(): Promise<{ tracking: string }> {
    // use the credentials to create new shipping

    Logger.debug(
      `Shipping created credentials: user ${this._fedexConfig.user}, pass: ${this._fedexConfig.pass}`,
    );
    return await new Promise((resolve) => {
      resolve({
        tracking: randomUUID(),
      });
    });
  }
}
