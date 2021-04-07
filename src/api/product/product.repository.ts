import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { CreateProductDto } from 'src/tools/dtos/product/createProductDto';
import { UpdateProductDto } from 'src/tools/dtos/product/updateProductDto';
import {
  GenericRepository,
  IGenericRepository,
} from '../Generic/generic.repository';

export interface IProductRepository
  extends IGenericRepository<Product, CreateProductDto, UpdateProductDto> {}

@Injectable()
export class ProductRepository
  extends GenericRepository<Product, CreateProductDto, UpdateProductDto>
  implements IProductRepository {
  constructor(@InjectModel(Product.name) productModel: Model<Product>) {
    super(productModel);
  }
}
