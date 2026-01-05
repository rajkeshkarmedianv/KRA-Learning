import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  // CREATE
  async create(dto: CreateProductDto, userId: number) {
    const product = this.productRepo.create({
      ...dto,
      createdBy: userId,
    });

    return this.productRepo.save(product);
  }

  // READ ALL WITH PAGINATION, FILTERING, AND SORTING
  async findAll(query?: {
    isActive?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }): Promise<{
    data: Product[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const where: { isActive?: boolean } = {};

    // Filter by isActive
    if (query?.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    } else {
      where.isActive = true;
    }
    const page = query?.page ? parseInt(query.page, 10) : 1;
    const limit = query?.limit ? parseInt(query.limit, 10) : 10;
    const skip = (page - 1) * limit;
    const sortBy = query?.sortBy || 'id';
    const sortOrder = query?.sortOrder || 'ASC';
    const allowedSortFields = ['id', 'name', 'price', 'createdAt', 'updatedAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'id';

    const total = await this.productRepo.count({
      where,
    });

    // Get paginated data
    const data = await this.productRepo.find({
      where,
      skip,
      take: limit,
      order: { [sortField]: sortOrder },
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

  // READ ONE
  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id, isActive: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  // UPDATE
  async update(id: number, dto: UpdateProductDto, userId: number) {
    const product = await this.findOne(id);

    Object.assign(product, dto);
    product.updatedBy = userId;

    return this.productRepo.save(product);
  }

  // SOFT DELETE
  async remove(id: number, userId: number) {
    const product = await this.findOne(id);

    product.isActive = false;
    product.updatedBy = userId;

    await this.productRepo.save(product);

    return { message: 'Product deleted successfully' };
  }
}
