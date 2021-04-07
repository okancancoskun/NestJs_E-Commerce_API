import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.model';
import { CreateProductDto } from 'src/tools/dtos/product/createProductDto';
import { UpdateProductDto } from 'src/tools/dtos/product/updateProductDto';
import { GenericService, IGenericService } from '../Generic/generic.service';
import { ProductRepository } from './product.repository';

export interface IProductService
  extends IGenericService<Product, CreateProductDto, UpdateProductDto> {}

@Injectable()
export class ProductService
  extends GenericService<Product, CreateProductDto, UpdateProductDto>
  implements IProductService {
  constructor(protected readonly repository: ProductRepository) {
    super(repository);
  }
}
