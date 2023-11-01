import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

// This is a shared service for creating shippings with Fedex
// each tenant should pass different credentials (stored in TenantsConfigs table)
// or the service shoud load credentials by itself using the `tenantId` paramenter ... or some other way?
@Injectable()
export class FedexService {
  private _tenantId: number;
  private _user: string;
  private _password: string;
  constructor(user: string, password: string, tenantId: number) {
    this._user = user;
    this._password = password;
    this._tenantId = tenantId;
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
