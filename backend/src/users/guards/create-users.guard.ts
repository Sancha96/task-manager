import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { hasRole, Role } from '../../common/roles/role.enum';

@Injectable()
export class CreateUsersGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { body, user } = context.switchToHttp().getRequest();

    if (body.roles === Role.Superadmin) {
      throw new ForbiddenException();
    }

    return hasRole(
      user.roles,
      body.roles === Role.Admin ? Role.Superadmin : Role.Admin,
    );
  }
}
