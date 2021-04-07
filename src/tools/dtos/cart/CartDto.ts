import { IsMongoId } from 'class-validator';

export class CartDto {
  @IsMongoId()
  productId: any;
}
