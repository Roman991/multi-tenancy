import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FedexService } from 'src/lib/fedex.service';
import { TenantConfig } from 'src/middleware/tenant-config.dto';
import { Shipping } from 'src/models/shippings.model';

@Injectable()
export class ShippingsService {
  constructor(
    @InjectModel(Shipping)
    private shippingModel: typeof Shipping,
  ) {}

  async createShipping(
    tenant: TenantConfig,
    params: {
      courier: 'fedex';
      userId: number;
    },
  ) {
    // todo this should be refactored, at least passing only fedex related configuration, not the whole tenant object
    // initialize new provider passing the whole tenant config object
    const fedexService = new FedexService(tenant);

    const createShippingRes = await fedexService.createShipping();
    return await this.shippingModel.create({
      courier: 'fedex',
      tracking: createShippingRes.tracking,
      tenantId: tenant.tenantId,
      userId: params.userId,
    });
  }

  async getAllShipping() {
    return await this.shippingModel.findAll();
  }
}
