/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../inventory/inventory.entity';
import { InventoryCron } from './inventory.cron';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Inventory]),
  ],
  providers: [InventoryCron],
})
export class CronModule {}
