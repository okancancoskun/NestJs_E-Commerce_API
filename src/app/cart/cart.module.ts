import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { CartRepository } from 'src/api/cart/cart.repository';
import { CartService } from 'src/api/cart/cart.service';
import { User, userSchema } from 'src/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [CartRepository, CartService],
  exports: [CartRepository, CartService],
})
export class CartModule {}
