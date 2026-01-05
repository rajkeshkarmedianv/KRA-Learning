import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';

@Injectable()
export class InventoryCron {
  private readonly logger = new Logger(InventoryCron.name);

  constructor(
    @InjectRepository(Inventory)
    private inventoryRepo: Repository<Inventory>,
  ) {}

  @Cron('*/5 * * * *')
  async updateInventoryStatus() {
    this.logger.log('Inventory cron running every 5 minute');

    const inventories = await this.inventoryRepo.find();

    for (const item of inventories) {
      item.status = item.quantity > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK';
      await this.inventoryRepo.save(item);
    }
  }
}
