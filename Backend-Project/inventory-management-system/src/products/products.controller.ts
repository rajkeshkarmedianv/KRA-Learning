/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AppRole } from 'src/common/constant/roles.constant';
import { RolesGuard } from 'src/common/guards/roles.guards';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // CREATE
  @Post()
  @Roles(AppRole.SUPER_ADMIN,AppRole.ADMIN)
  create(@Body() dto: CreateProductDto, @Req() req) {
    return this.productService.create(dto, req.user.userId);
  }

  // READ ALL WITH PAGINATION, FILTERING, AND SORTING
  @Get()
  @Roles(AppRole.SUPER_ADMIN,AppRole.ADMIN, AppRole.MANAGER)
  findAll(@Query() query: {
    isActive?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }) {
    return this.productService.findAll(query);
  }

  // READ ONE
  @Get(':id')
  @Roles(AppRole.SUPER_ADMIN,AppRole.ADMIN, AppRole.MANAGER)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  // UPDATE
  @Patch(':id')
  @Roles(AppRole.SUPER_ADMIN,AppRole.ADMIN, AppRole.MANAGER)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @Req() req,
  ) {
    return this.productService.update(Number(id), dto, req.user.userId);
  }

  // DELETE (SOFT) 
  @Delete(':id')
  @Roles(AppRole.SUPER_ADMIN,AppRole.ADMIN)
  remove(@Param('id') id: string, @Req() req) {
    return this.productService.remove(Number(id), req.user.userId);
  }
}
