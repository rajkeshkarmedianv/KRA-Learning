import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppRole } from '../common/constant/roles.constant';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    enum: AppRole,
    default: AppRole.STAFF,
  })
  role: AppRole;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: number;
}


