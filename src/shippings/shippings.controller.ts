import { Controller, Get, Post, Headers } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ShippingsService } from './shippings.service';

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
  @Post()
  async createShipping(@Headers() headers) {
    const tenantId = headers['x-tenant-id'];
    const userId = headers['x-user-id'];
    return await this.shippingService.createShipping({
      tenantId,
      courier: 'fedex',
      userId,
    });
  }
}
