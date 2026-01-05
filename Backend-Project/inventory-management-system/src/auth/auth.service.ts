/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AppRole } from '../common/constant/roles.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto, creatorId?: number) {
    const superAdminCount =
      await this.usersService.countSuperAdmins();

    //  Super Admin must be first
    if (
      superAdminCount === 0 &&
      dto.role !== AppRole.SUPER_ADMIN
    ) {
      throw new BadRequestException(
        'Super Admin must be created first',
      );
    }

    //  Only one Super Admin
    if (
      superAdminCount > 0 &&
      dto.role === AppRole.SUPER_ADMIN
    ) {
      throw new BadRequestException(
        'Super Admin already exists',
      );
    }

    //  Unique email
    const existingUser =
      await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException(
        'Email already registered',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.usersService.createUser(
      {
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      },
      creatorId, 
    );
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(
      dto.password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
