import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/api/auth/auth.service';
import { User } from 'src/models/user.model';
import { LoginUserDto } from 'src/tools/dtos/user/loginUserDto';
import { RegisterUserDto } from 'src/tools/dtos/user/registerUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() body: RegisterUserDto): Promise<User | any> {
    return await this.authService.registerUser(body);
  }

  @Post('login')
  async loginUser(@Body() body: LoginUserDto): Promise<any> {
    return await this.authService.loginUser(body);
  }
}
