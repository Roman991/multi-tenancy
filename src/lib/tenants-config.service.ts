import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TenantsConfig } from 'src/models/tenants-config.model';

@Injectable()
export class TenantsConfigService {
  constructor(
    @InjectModel(TenantsConfig)
    private tenantsConfigModel: typeof TenantsConfig,
  ) {}

  async getConfig(tenantId: number, configName: string) {
    return await this.tenantsConfigModel.findOne({
      where: {
        tenantId,
        configName,
      },
    });
  }
}
