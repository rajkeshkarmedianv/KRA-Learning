import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AppRole } from '../common/constant/roles.constant';
import { UpdateUserDto } from './dto/update-users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    userData: {
      email: string;
      password: string;
      role: AppRole;
    },
    creatorId?: number,
  ): Promise<Omit<User, 'password'>> {
    const user = this.userRepository.create({
      ...userData,
      createdBy: creatorId,
    });
    const savedUser = await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = savedUser;
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      select: ['id', 'email', 'role', 'isActive', 'createdAt', 'updatedAt'],
    });
    return user;
  }

  async findAll(query?: { 
    isActive?: string; 
    page?: string; 
    limit?: string;
  }): Promise<{
    data: Omit<User, 'password'>[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const where: { isActive?: boolean } = {};
    
    if (query?.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    }

    // Pagination parameters
    const page = query?.page ? parseInt(query.page, 10) : 1;
    const limit = query?.limit ? parseInt(query.limit, 10) : 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const total = await this.userRepository.count({
      where: Object.keys(where).length > 0 ? where : undefined,
    });

    // Get paginated data
    const data = await this.userRepository.find({
      where: Object.keys(where).length > 0 ? where : undefined,
      select: ['id', 'email', 'role', 'isActive', 'createdAt', 'updatedAt'],
      skip,
      take: limit,
      order: { id: 'ASC' },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findInactiveUsers(): Promise<Omit<User, 'password'>[]> {
    return this.userRepository.find({
      where: { isActive: false },
      select: ['id', 'email', 'role', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  async countSuperAdmins(): Promise<number> {
    return this.userRepository.count({
      where: { role: AppRole.SUPER_ADMIN },
    });
  }

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
    updatedBy: number,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.role && dto.role !== user.role) {
      // Ensure we don't remove the last SUPER_ADMIN
      if (user.role === AppRole.SUPER_ADMIN && dto.role !== AppRole.SUPER_ADMIN) {
        const superAdminCount = await this.countSuperAdmins();
        if (superAdminCount <= 1) {
          throw new BadRequestException(
            'At least one SUPER_ADMIN must remain in the system',
          );
        }
      }

      user.role = dto.role;
    }

    user.updatedBy = updatedBy;

    const updatedUser = await this.userRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = updatedUser;
    return result;
  }

  async deactivateUser(
    userId: number,
    deactivatedBy: number,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id === deactivatedBy) {
      throw new BadRequestException('Cannot deactivate yourself');
    }

    if (!user.isActive) {
      throw new BadRequestException('User is already deactivated');
    }

    user.isActive = false;
    user.updatedBy = deactivatedBy;
    const updatedUser = await this.userRepository.save(user);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = updatedUser;
    return result;
  }
}
