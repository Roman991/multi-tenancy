import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

const TENANT_HEADER_NAME = 'x-tenant-id'; // Replace with the header name you want to check
const USER_HEADER_NAME = 'x-user-id'; // Replace with the header name you want to check

/**
 * this interceptor checks if a header with tenantId is present and fetches all its configs
 * storing all configs in a hashMap and returns from memory if already fetched
 */
@Injectable()
export class UserInterceptor implements NestInterceptor {
  private logger = new Logger(UserInterceptor.name);
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
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

    const userInTenant = await this.checkUserInTenant(userId, tenantId);
    if (!userInTenant) {
      throw new BadRequestException('User does not belong to tenant');
    }

    return next.handle();
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
        this.logger.error(err);
        throw new InternalServerErrorException(
          'Error occured when retieving user info',
        );
      });
    if (!user) return false;
    return true;
  }
}
