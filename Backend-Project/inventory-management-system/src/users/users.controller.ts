/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guards';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../common/constant/roles.constant';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //  GET USERS (ACTIVE / INACTIVE / ALL) WITH PAGINATION
  @Get()
  @Roles(AppRole.SUPER_ADMIN)
  getUsers(@Query() query: { 
    isActive?: string; 
    page?: string; 
    limit?: string;
  }) {
    return this.usersService.findAll(query);
  }

  //  GET USER BY ID
  @Get(':id')
  @Roles(AppRole.SUPER_ADMIN, AppRole.ADMIN)
  getUser(@Param('id') id: string) {
    return this.usersService.findById(Number(id));
  }

  //  UPDATE USER
  @Patch(':id')
  @Roles(AppRole.SUPER_ADMIN, AppRole.ADMIN)
  updateUser(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.usersService.updateUser(
      Number(id),
      body,
      req.user.userId,
    );
  }

  //  DEACTIVATE USER
  @Patch(':id/deactivate')
  @Roles(AppRole.SUPER_ADMIN, AppRole.ADMIN)
  deactivateUser(@Param('id') id: string, @Req() req: any) {
    return this.usersService.deactivateUser(
      Number(id),
      req.user.userId,
    );
  }
}
