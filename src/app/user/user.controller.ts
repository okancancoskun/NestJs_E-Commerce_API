import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { Roles } from 'src/libs/decorators/role.decorator';
import { User } from 'src/models/user.model';
import { UpdateUserDto } from 'src/tools/dtos/user/updateUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll({}, { populate: 'roleId' });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne({ _id: id }, { populate: 'roleId' });
  }

  @Roles('admin', 'user')
  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.findByIdAndUpdate(id, body);
  }

  @Roles('admin')
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteOne(id);
  }
}
