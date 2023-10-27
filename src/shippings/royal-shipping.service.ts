import { Injectable } from '@nestjs/common';

@Injectable()
export class RoyalShippingService {
  private _tenantId: number;
  private _user: string;
  private _password: string;
  constructor(user: string, password: string, tenantId: number) {
    this._user = user;
    this._password = password;
    this._tenantId = tenantId;
  }

  async createShipping() {
    const shippingCreationRes = await new Promise((res, rej) => {
      res(
        `shipping created from tenant ${this._tenantId}. User: ${this._user}`,
      );
    });
    return shippingCreationRes;
  }
}
