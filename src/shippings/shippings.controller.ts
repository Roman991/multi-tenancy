import {
  Controller,
  Get,
  Post,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ShippingsService } from './shippings.service';
import { TenantInterceptor } from 'src/middleware/tenant.interceptor';
import { Tenant } from 'src/decorators/tenant.decorator';
import { TenantConfig } from 'src/middleware/tenant-config.dto';
import { UserInterceptor } from 'src/middleware/user.interceptor';

// Here we have just one entry point for all tenants
@ApiTags('shippings')
@Controller('shippings')
export class ShippingsController {
  constructor(private shippingService: ShippingsService) {}

  // returing all shipping for all tenants
  @Get()
  async getShippings() {
    return await this.shippingService.getAllShipping();
  }

  // creating shipping based on tenantId
  @ApiHeader({
    name: 'x-tenant-id',
    required: true,
    description: 'The tenant ID',
  })
  @ApiHeader({
    name: 'x-user-id',
    required: true,
    description: 'The user ID',
  })
  @UseInterceptors(UserInterceptor, TenantInterceptor)
  @Post()
  async createShipping(
    @Headers() headers,
    @Tenant()
    tenant: TenantConfig,
  ) {
    const userId = headers['x-user-id'];
    return await this.shippingService.createShipping(tenant, {
      courier: 'fedex',
      userId,
    });
  }
}
