import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepository } from 'src/api/product/product.repository';
import { ProductService } from 'src/api/product/product.service';
import { Product, productSchema } from 'src/models/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
  ],
  providers: [ProductRepository, ProductService],
  exports: [ProductRepository, ProductService],
})
export class ProductModule {}
