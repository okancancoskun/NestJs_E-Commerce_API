import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from 'src/api/category/category.service';
import { Roles } from 'src/libs/decorators/role.decorator';
import { Category } from 'src/models/category.model';
import { CreateCategoryDto } from 'src/tools/dtos/category/createCategoryDto';
import { UpdateCategoryDto } from 'src/tools/dtos/category/updateCategoryDto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll({}, {});
  }

  @Roles('admin')
  @Post('create')
  async create(@Body() body: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOne({}, {});
  }

  @Roles('admin')
  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.findByIdAndUpdate(id, body);
  }

  @Roles('admin')
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.categoryService.deleteOne(id);
  }
}
