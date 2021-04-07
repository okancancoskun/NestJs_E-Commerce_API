import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from 'src/api/product/product.service';
import { Roles } from 'src/libs/decorators/role.decorator';
import { Product } from 'src/models/product.model';
import { CreateProductDto } from 'src/tools/dtos/product/createProductDto';
import { UpdateProductDto } from 'src/tools/dtos/product/updateProductDto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll({}, { populate: 'categoryId' });
  }

  @Roles('admin')
  @Post('create')
  async create(@Body() body: CreateProductDto): Promise<Product> {
    return await this.productService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(
      { _id: id },
      { populate: 'categoryId' },
    );
  }

  @Roles('admin')
  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.findByIdAndUpdate(id, body);
  }

  @Roles('admin')
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.deleteOne(id);
  }
}
