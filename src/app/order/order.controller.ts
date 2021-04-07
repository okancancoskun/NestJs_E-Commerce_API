import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from 'src/api/order/order.service';
import { Roles } from 'src/libs/decorators/role.decorator';
import { Order } from 'src/models/order.models';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles('admin')
  @Get('')
  async findAll(): Promise<Order[]> {
    return await this.orderService.findAll(
      {},
      { populate: 'userId items.productId' },
    );
  }

  @Roles('user')
  @Post('create/:userid')
  async createOrder(@Param('userid') userid: string): Promise<any> {
    return await this.orderService.createOrder(userid);
  }

  @Roles('user', 'admin')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return await this.orderService.findOne(
      { _id: id },
      { populate: 'userId items.productId' },
    );
  }

  @Roles('user', 'admin')
  @Get(':userid')
  async findOrdersByUserId(@Param() params: { userid: any }): Promise<Order[]> {
    return await this.orderService.findAll(
      { userId: params.userid },
      { populate: 'userId items.productId' },
    );
  }

  @Roles('admin')
  @Delete(':id')
  async deleteOne(@Param(':id') id: string): Promise<Order> {
    return await this.orderService.deleteOne(id);
  }
}
