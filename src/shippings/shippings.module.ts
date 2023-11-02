import { Module, Scope } from '@nestjs/common';
import { ShippingsController } from './shippings.controller';
import { ShippingsService } from './shippings.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TenantsConfig } from 'src/models/tenants-config.model';
import { Shipping } from 'src/models/shippings.model';
import { FedexService } from 'src/lib/fedex.service';
import { REQUEST } from '@nestjs/core';
import { TenantsConfigService } from 'src/lib/tenants-config.service';

export interface ContextPayload {
  tenantId: number;
}

@Module({
  imports: [SequelizeModule.forFeature([TenantsConfig, Shipping])],
  controllers: [ShippingsController],
  providers: [
    TenantsConfigService,
    ShippingsService,
    {
      provide: FedexService,
      scope: Scope.REQUEST,
      durable: true,
      useFactory: async (ctxPayload: ContextPayload) => {
        return new FedexService();
      },
      inject: [REQUEST],
    },
  ],
})
export class ShippingsModule {}
