import { UserModule } from './app/user/user.module';
import { UserController } from './app/user/user.controller';
import { OrderModule } from './app/order/order.module';
import { OrderController } from './app/order/order.controller';
import { CartController } from './app/cart/cart.controller';
import { CartModule } from './app/cart/cart.module';
import { CategoryController } from './app/category/category.controller';
import { CategoryModule } from './app/category/category.module';
import { ProductModule } from './app/product/product.module';
import { ProductController } from './app/product/product.controller';
import { AuthModule } from './app/auth/auth.module';
import { AuthController } from './app/auth/auth.controller';
import { RoleModule } from './app/role/role.module';
import { RoleController } from './app/role/role.controller';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import environment from './tools/environment';
import { AuthMiddleware } from './libs/middlewares/auth.middleware';

@Module({
  imports: [
    UserModule,
    OrderModule,
    CartModule,
    CategoryModule,
    ProductModule,
    AuthModule,
    RoleModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: environment.mongoUrl,
        useFindAndModify: false,
      }),
    }),
  ],
  controllers: [
    UserController,
    OrderController,
    CartController,
    CategoryController,
    ProductController,
    AuthController,
    RoleController,
    AppController,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: '/user/:id',
        method: RequestMethod.PUT,
      },
      {
        path: '/user/:id',
        method: RequestMethod.DELETE,
      },
      CartController,
      OrderController,
      {
        path: '/category/create',
        method: RequestMethod.POST,
      },
      {
        path: '/category/:id',
        method: RequestMethod.PUT,
      },
      {
        path: '/category/create',
        method: RequestMethod.DELETE,
      },
      {
        path: '/product/create',
        method: RequestMethod.POST,
      },
      {
        path: '/product/:id',
        method: RequestMethod.PUT,
      },
      {
        path: '/product/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
