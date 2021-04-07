import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { CartDto } from 'src/tools/dtos/cart/CartDto';
import { GenericService, IGenericService } from '../Generic/generic.service';
import { CartRepository } from './cart.repository';

export interface ICartService extends IGenericService<User, {}, {}> {
  addToCart(dto: CartDto, id: string): Promise<User>;
  deleteCartItem(dto: CartDto, id: string): Promise<any>;
  clearCart(id: string): Promise<any>;
}

@Injectable()
export class CartService
  extends GenericService<User, {}, {}>
  implements ICartService {
  constructor(protected readonly repository: CartRepository) {
    super(repository);
  }

  async addToCart(dto: CartDto, id: string): Promise<User> {
    const user = await this.repository.findOne({ _id: id }, {});
    const index = user.cartItems.findIndex(
      (item) => item.productId.toString() === dto.productId.toString(),
    );
    const updatedCartItems = [...user.cartItems];

    var itemQuantity = 1;
    if (index >= 0) {
      itemQuantity = user.cartItems[index].quantity + 1;
      updatedCartItems[index].quantity = itemQuantity;
    } else {
      updatedCartItems.push({
        productId: dto.productId,
        quantity: itemQuantity,
      });
      await user.save();
    }
    user.cartItems = updatedCartItems;
    return user.save();
  }

  async deleteCartItem(dto: CartDto, id: string): Promise<any> {
    const user = await this.repository.findOne({ _id: id }, {});

    const cartItems = user.cartItems.filter(
      (item) => item.productId.toString() !== dto.productId.toString(),
    );
    return await user.updateOne({
      $set: {
        cartItems: cartItems,
      },
    });
  }

  async clearCart(id: string): Promise<any> {
    const user = await this.repository.findOne({ _id: id }, {});
    user.cartItems = [];
    return await user.save();
  }
}
