import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FedexService } from 'src/lib/fedex.service';
import { Shipping } from 'src/models/shippings.model';
import { TenantsConfig } from 'src/models/tenants-config.model';

@Injectable()
export class ShippingsService {
  constructor(
    @InjectModel(TenantsConfig)
    private tenantsConfigModel: typeof TenantsConfig,
    @InjectModel(Shipping)
    private shippingModel: typeof Shipping,
  ) {}

  async createShipping(params: {
    tenantId: number;
    courier: 'fedex';
    userId: number;
  }) {
    // TODO here I should load the `tenantId` config and create a new instance of the provider FedexService
    // TODO or load the already initiated one for that tenant (idk).

    // ! this is a wrong (imo) way to do it, just to understand the logical flow of what i'm trying to achieve

    // The whole `TenantsConfig` can be changes in shape if you think its better
    const config = await this.tenantsConfigModel.findOne({
      where: {
        tenantId: params.tenantId,
        configName: 'courierFedex',
      },
    });
    if (!config) {
      throw new Error('config not found for tenant ' + params.tenantId);
    }
    const { user, pass } = config.configValue;

    const fedexService = new FedexService(user, pass, params.tenantId);

    const createShippingRes = await fedexService.createShipping();
    return await this.shippingModel.create({
      courier: 'fedex',
      tracking: createShippingRes.tracking,
      tenantId: params.tenantId,
      userId: params.userId,
    });
  }

  async getAllShipping() {
    return await this.shippingModel.findAll();
  }
}
