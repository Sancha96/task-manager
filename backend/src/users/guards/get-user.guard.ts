import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { hasRole, Role } from '../../common/roles/role.enum';

@Injectable()
export class GetUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const {
      params: { uuid },
      user,
    } = context.switchToHttp().getRequest();

    if (uuid === user.uuid) {
      return true;
    }

    return hasRole(user.roles, Role.Admin);
  }
}
