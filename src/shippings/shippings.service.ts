import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FedexService } from 'src/lib/fedex.service';
import { TenantConfig } from 'src/middleware/tenant-config.dto';
import { Shipping } from 'src/models/shippings.model';
import { User } from 'src/models/user.model';
import { TenantConfigService } from 'src/tenant-config/tenant-config.service';
import { TenantContext } from 'src/tenant-config/tenant-context.decorator';

@Injectable()
export class ShippingsService {
  constructor(
    @InjectModel(Shipping)
    private shippingModel: typeof Shipping,
    private tenantConfigService: TenantConfigService,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
    // todo this should be refactored, at least passing only fedex related configuration, not the whole tenant object
    // initialize new provider passing the whole tenant config object

  async createShipping(params: { courier: 'fedex'; userId: number }, @TenantContext() contextId: string) {
    const tenantId = +contextId.split('-')[1]; // Extract tenantId from contextId
    const userInTenant = await this.checkUserInTenant(params.userId, tenantId);
    if (!userInTenant ) {
      throw new BadRequestException('User does not belong to tenant');
    }
    const tenantConfig = await this.tenantConfigService.getConfig();
    const fedexService = new FedexService(tenantConfig);
    const createShippingRes = await fedexService.createShipping();
    return await this.shippingModel.create({
      courier: 'fedex',
      tracking: createShippingRes.tracking,
      tenantId: tenantId, 
      userId: params.userId,
    });
  }

  private async checkUserInTenant(
    userId: number,
    tenantId: number,
  ): Promise<boolean> {
    const user = await this.userModel
      .findOne({
        where: { id: userId, tenantId },
      })
      .catch((err) => {
        Logger.error(err);
        throw new InternalServerErrorException(
          'Error occured when retieving user info',
        );
      });
    if (user== null) return false;
    return true;
  }

  async getAllShipping() {
    return await this.shippingModel.findAll();
  }  
}
