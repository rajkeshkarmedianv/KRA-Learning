import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { AppRole } from '../../common/constant/roles.constant';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(AppRole)
  role: AppRole;
}
