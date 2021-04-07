import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderRepository } from 'src/api/order/order.repository';
import { OrderService } from 'src/api/order/order.service';
import { Order, orderSchema } from 'src/models/order.models';
import { CartModule } from '../cart/cart.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]),
    CartModule,
    UserModule,
  ],
  providers: [OrderRepository, OrderService],
  exports: [OrderRepository, OrderService],
})
export class OrderModule {}
