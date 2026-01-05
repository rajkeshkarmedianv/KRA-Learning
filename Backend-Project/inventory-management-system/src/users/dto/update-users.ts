import { IsEnum, IsOptional } from 'class-validator';
import { AppRole } from '../../common/constant/roles.constant';

export class UpdateUserDto {
  @IsOptional()
  @IsEnum(AppRole)
  role?: AppRole;
}
