import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { RegisterUserDto } from 'src/tools/dtos/user/registerUserDto';
import { UpdateUserDto } from 'src/tools/dtos/user/updateUserDto';
import {
  GenericRepository,
  IGenericRepository,
} from '../Generic/generic.repository';

export interface IUserRepository
  extends IGenericRepository<User, RegisterUserDto, UpdateUserDto> {}

@Injectable()
export class UserRepository
  extends GenericRepository<User, {}, UpdateUserDto>
  implements IUserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
}
