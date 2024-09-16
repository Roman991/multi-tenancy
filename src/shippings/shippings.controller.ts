// shippings.controller.ts
import { Controller, Get, Post, Headers, UseInterceptors } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ShippingsService } from './shippings.service';
// Here we have just one entry point for all tenants
import { TenantConfigService } from 'src/tenant-config/tenant-config.service';
import { ValidationInterceptor } from 'src/middleware/user.interceptor';
import { TenantContext } from 'src/tenant-config/tenant-context.decorator';

@ApiTags('shippings')
@Controller('shippings')
export class ShippingsController {
  constructor(
    private readonly shippingService: ShippingsService,
  ) {}

  // Returning all shippings for all tenants
  @Get()
  async getShippings() {
    return await this.shippingService.getAllShipping();
  }

  // Creating shipping based on tenantId
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
  @UseInterceptors(ValidationInterceptor)
  @Post()
  async createShipping(@Headers() headers, @TenantContext() tenantId: string) {
    const userId = headers['x-user-id'];
    return await this.shippingService.createShipping( {
      courier: 'fedex',
      userId,
    }, tenantId);
  }
}
