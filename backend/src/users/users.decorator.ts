import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function Users(Guard: any) {
  return applyDecorators(UseGuards(AuthGuard('jwt'), Guard));
}
