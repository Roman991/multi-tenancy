import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { load } from './load-config';
import { User } from './models/user.model';
import { Tenant } from './models/tenant.model';
import { TenantsConfig } from './models/tenants-config.model';
import { ShippingsModule } from './shippings/shippings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [async () => load()],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PSQL_URL,
      port: Number(process.env.PSQL_PORT),
      username: process.env.PSQL_USER,
      password: process.env.PSQL_PASSWORD,
      database: process.env.PSQL_DB,
      models: [User, Tenant, TenantsConfig],
    }),
    ShippingsModule,
  ],
})
export class AppModule {}
