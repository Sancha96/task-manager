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
export class UpdateUsersGuard implements CanActivate {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      body,
      params: { uuid },
      user,
    } = context.switchToHttp().getRequest();
    const isUuid = isUUID(uuid);

    if (!isUuid) {
      throw new BadRequestException('Validation failed (uuid is expected)');
    }

    const userForUpdate = await this.usersService.findOne(uuid);

    if (
      body.roles === Role.Superadmin ||
      userForUpdate.roles === Role.Superadmin
    ) {
      throw new ForbiddenException();
    }

    if (uuid !== user.uuid) {
      return (
        hasRole(
          user.roles,
          body.roles === Role.Admin ? Role.Superadmin : Role.Admin,
        ) &&
        hasRole(
          user.roles,
          userForUpdate.roles === Role.Admin ? Role.Superadmin : Role.Admin,
        )
      );
    }

    delete body.roles;

    return true;
  }
}
