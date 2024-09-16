import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const TENANT_HEADER_NAME = 'x-tenant-id'; // Replace with the header name you want to check
const USER_HEADER_NAME = 'x-user-id'; // Replace with the header name you want to check

/**
 * this interceptor validate headers
 */
@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  private logger = new Logger(ValidationInterceptor.name);
  constructor(
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers[TENANT_HEADER_NAME]) {
      throw new BadRequestException('Tenant header is missing');
    }
    if (!request.headers[USER_HEADER_NAME]) {
      throw new BadRequestException('User header is missing');
    }
    const tenantId = Number(request.headers[TENANT_HEADER_NAME]);
    const userId = Number(request.headers[USER_HEADER_NAME]);
    return next.handle();
  }
}
