import { Module } from '@nestjs/common';
import { ShippingsController } from './shippings.controller';
import { ShippingsService } from './shippings.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TenantsConfig } from 'src/models/tenants-config.model';
import { Shipping } from 'src/models/shippings.model';
import { User } from 'src/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([TenantsConfig, Shipping, User])],
  controllers: [ShippingsController],
  providers: [ShippingsService],
})
export class ShippingsModule {}
