import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryRepository } from 'src/api/category/category.repository';
import { CategoryService } from 'src/api/category/category.service';
import { Category, categorySchema } from 'src/models/category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: categorySchema },
    ]),
  ],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
