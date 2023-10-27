import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingsService {
  createShipping(tenantId: number) {
    console.log('from shippingService. TenantId ' + tenantId);
    // todo based on tenantId the proper royalShippingService should be instantiated/loaded and the shipping should be created
  }
}
