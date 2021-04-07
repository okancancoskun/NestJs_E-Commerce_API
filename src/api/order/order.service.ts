import { Injectable } from '@nestjs/common';
import { Order } from 'src/models/order.models';
import { CartService } from '../cart/cart.service';
import { GenericService, IGenericService } from '../Generic/generic.service';
import { UserService } from '../user/user.service';
import { OrderRepository } from './order.repository';

export interface IOrderService
  extends IGenericService<Order, {}, {}> {
  createOrder(id: string): Promise<any>;
}

@Injectable()
export class OrderService
  extends GenericService<Order, {}, {}>
  implements IOrderService {
  constructor(protected readonly repository: OrderRepository) {
    super(repository);
  }

  async createOrder(id: string): Promise<any> {
    return await this.repository.createOrder(id);
  }
}
