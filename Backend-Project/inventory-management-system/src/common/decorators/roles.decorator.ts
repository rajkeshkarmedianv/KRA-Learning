/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { AppRole } from '../constant/roles.constant';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AppRole[]) =>
  SetMetadata(ROLES_KEY, roles);

export { AppRole };
