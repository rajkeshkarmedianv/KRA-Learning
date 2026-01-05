/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { Product } from '../products/products.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepo: Repository<Inventory>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  // ADD PRODUCT TO INVENTORY
  async addProductToInventory(productId: number, userId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const inventory = this.inventoryRepo.create({
      product,
      quantity: 0,
      status: 'OUT_OF_STOCK',
      createdBy: userId,
    });

    return this.inventoryRepo.save(inventory);
  }

  // UPDATE STOCK
  async updateStock(productId: number, quantity: number, userId: number) {
    const inventory = await this.inventoryRepo.findOne({
      where: { product: { id: productId } },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    inventory.quantity = quantity;
    inventory.status = quantity > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK';
    inventory.updatedBy = userId;

    return this.inventoryRepo.save(inventory);
  }

  // GET ALL INVENTORY WITH PAGINATION, FILTERING, AND SORTING
  async findAll(query?: {
    status?: 'IN_STOCK' | 'OUT_OF_STOCK';
    isActive?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }): Promise<{
    data: Inventory[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const where: { status?: 'IN_STOCK' | 'OUT_OF_STOCK'; isActive?: boolean } = {};

    // Filter by status
    if (query?.status) {
      where.status = query.status;
    }

    // Filter by isActive
    if (query?.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    }
    const page = query?.page ? parseInt(query.page, 10) : 1;
    const limit = query?.limit ? parseInt(query.limit, 10) : 10;
    const skip = (page - 1) * limit;
    const sortBy = query?.sortBy || 'id';
    const sortOrder = query?.sortOrder || 'ASC';
    const allowedSortFields = ['id', 'quantity', 'status', 'createdAt', 'updatedAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'id';
    const total = await this.inventoryRepo.count({
      where: Object.keys(where).length > 0 ? where : undefined,
    });

    // Get paginated data
    const data = await this.inventoryRepo.find({
      where: Object.keys(where).length > 0 ? where : undefined,
      skip,
      take: limit,
      order: { [sortField]: sortOrder },
      relations: ['product'],
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
}
