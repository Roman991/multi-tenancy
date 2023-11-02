import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TenantsConfigService } from './tenants-config.service';

// This is a shared service for creating shippings with Fedex
// each tenant should pass different credentials (stored in TenantsConfigs table)
// or the service shoud load credentials by itself using the `tenantId` paramenter ... or some other way?
@Injectable()
export class FedexService {
  private _tenantId: number;
  constructor(
    tenantId: number,
    private tenantsConfigService: TenantsConfigService,
  ) {
    this._tenantId = tenantId;

    tenantsConfigService.getConfig(Number(tenantId), 'courierFedex');
  }

  async createShipping(): Promise<{ tracking: string }> {
    // use the credentials to create new shipping
    Logger.debug(
      `Shipping created from tenant ${this._tenantId}. User: ${this._user}`,
    );
    return await new Promise((resolve) => {
      resolve({
        tracking: randomUUID(),
      });
    });
  }
}
