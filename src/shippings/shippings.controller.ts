import { Controller, Get, Post, Headers } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ShippingsService } from './shippings.service';

@ApiTags('shippings')
@Controller('shippings')
export class ShippingsController {
  constructor(private shippingService: ShippingsService) {}

  @Get()
  getShippings() {
    return [];
  }

  @ApiHeader({
    name: 'x-tenant',
    required: true,
    description: 'The tenant ID',
  })
  @Post()
  createShipping(@Headers() headers) {
    // the x-tenant is passed by client to invoce the right provider
    const tenantId = headers['x-tenant'];
    this.shippingService.createShipping(tenantId);
    return true;
  }
}
