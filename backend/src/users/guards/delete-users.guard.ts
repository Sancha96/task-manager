import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';

import { isUUID } from 'class-validator';

import { hasRole, Role } from '../../common/roles/role.enum';

import { UsersService } from '../users.service';

@Injectable()
export class DeleteUsersGuard implements CanActivate {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      params: { uuid },
      user,
    } = context.switchToHttp().getRequest();
    const isUuid = isUUID(uuid);

    if (!isUuid) {
      throw new BadRequestException('Validation failed (uuid is expected)');
    }

    const userForDelete = await this.usersService.findOne(uuid);

    if (userForDelete.roles === Role.Superadmin) {
      throw new ForbiddenException();
    }

    if (uuid === user.uuid) {
      throw new BadRequestException('The current user cannot be deleted');
    }

    return hasRole(
      user.roles,
      userForDelete.roles === Role.Admin ? Role.Superadmin : Role.Admin,
    );
  }
}
