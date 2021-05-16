export enum Role {
  Manager = 1 << 1,
  Admin = 1 << 2,
  Superadmin = Manager | Admin,
}

export function hasRole(userRoles: Role, role?: Role) {
  return role ? (userRoles & role) === role : true;
}

export function addRole(userRoles: Role, role: Role) {
  return userRoles | role;
}

export function removeRole(userRoles: Role, role: Role) {
  return userRoles & ~role;
}
