import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CartService } from 'src/api/cart/cart.service';
import { CartDto } from 'src/tools/dtos/cart/CartDto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('addItem/:userid')
  async addToCart(
    @Body() body: CartDto,
    @Param('userid') userid: string,
  ): Promise<any> {
    return await this.cartService.addToCart(body, userid);
  }

  @Post('deleteItem/:userid')
  async deleteCartItem(
    @Body() body: CartDto,
    @Param('userid') userid: string,
  ) {
    return await this.cartService.deleteCartItem(body, userid);
  }
}
