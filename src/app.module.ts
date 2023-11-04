import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShippingsModule } from './shippings/shippings.module';
import { Shipping } from './models/shippings.model';
import { Tenant } from './models/tenant.model';
import { TenantsConfig } from './models/tenants-config.model';
import { User } from './models/user.model';
import { ConfigModule } from '@nestjs/config';
import { TenantConfigModule } from './tenant-config/tenant-config.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PSQL_URL,
      port: Number(process.env.PSQL_PORT),
      username: process.env.PSQL_USER,
      password: process.env.PSQL_PASSWORD,
      database: process.env.PSQL_DB,
      models: [Shipping, Tenant, TenantsConfig, User],
      synchronize: false,
    }),
    ShippingsModule,
    TenantConfigModule,
  ],
})
export class AppModule {}
