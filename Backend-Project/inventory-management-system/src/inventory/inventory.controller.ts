/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Query,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AppRole } from 'src/common/constant/roles.constant';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  // ADD PRODUCT
  @Post(':productId')
  @Roles(AppRole.SUPER_ADMIN,AppRole.ADMIN,AppRole.MANAGER)
  addProduct(
    @Param('productId') productId: string,
    @Req() req,
  ) {
    return this.inventoryService.addProductToInventory(
      Number(productId),
      req.user.userId,
    );
  }

  // UPDATE STOCK
  @Patch(':productId')
  @Roles(AppRole.SUPER_ADMIN,AppRole.ADMIN, AppRole.MANAGER)
  updateStock(
    @Param('productId') productId: string,
    @Body() dto: UpdateStockDto,
    @Req() req,
  ) {
    return this.inventoryService.updateStock(
      Number(productId),
      dto.quantity,
      req.user.userId,
    );
  }

  // VIEW INVENTORY WITH PAGINATION, FILTERING, AND SORTING
  @Get()
  @Roles(AppRole.SUPER_ADMIN,AppRole.ADMIN, AppRole.MANAGER)
  findAll(@Query() query: {
    status?: 'IN_STOCK' | 'OUT_OF_STOCK';
    isActive?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }) {
    return this.inventoryService.findAll(query);
  }
}
