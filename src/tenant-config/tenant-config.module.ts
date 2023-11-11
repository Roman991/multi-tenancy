import { Global, Module } from '@nestjs/common';
import { TenantConfigService } from './tenant-config.service';
import { TenantContextProvider } from 'src/tenant-config/tenant-context.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { TenantsConfig } from 'src/models/tenants-config.model';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([TenantsConfig])],
  providers: [TenantConfigService, TenantContextProvider],
  exports: [TenantConfigService, TenantContextProvider],
})
export class TenantConfigModule {}
