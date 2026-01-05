/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // Get roles from both handler and class level decorators
    const handlerRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    const classRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getClass(),
    );
    
    // Combine roles from both levels
    const roles = handlerRoles || classRoles;

    // If no roles are required, allow access
    if (!roles || roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    
    // Check if user exists (should be set by JwtAuthGuard)
    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Check if user has required role
    if (!request.user.role) {
      throw new UnauthorizedException('User role not found');
    }

    // Check if user's role is in the allowed roles
    if (!roles.includes(request.user.role)) {
      throw new UnauthorizedException('Insufficient permissions');
    }

    return true;
  }
}
