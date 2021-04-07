import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/models/order.models';
import { UserService } from '../user/user.service';
import { CartService } from '../cart/cart.service';
import {
  GenericRepository,
  IGenericRepository,
} from '../Generic/generic.repository';

export interface IOrderRepository extends IGenericRepository<Order, {}, {}> {
  createOrder(id: string): Promise<any>;
}

@Injectable()
export class OrderRepository
  extends GenericRepository<Order, {}, {}>
  implements IOrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly userService: UserService,
    private readonly cartService: CartService,
  ) {
    super(orderModel);
  }

  async createOrder(id: string): Promise<any> {
    const user = await this.userService.findOne(
      { _id: id },
      { populate: 'cartItems.productId' },
    );

    const order = new this.orderModel({
      userId: user._id,
      items: user.cartItems.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      }),
    });
    await order.save();
    return await this.cartService.clearCart(id);
  }
}
