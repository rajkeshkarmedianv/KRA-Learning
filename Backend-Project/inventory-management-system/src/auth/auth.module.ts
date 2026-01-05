/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
//import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
 import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
