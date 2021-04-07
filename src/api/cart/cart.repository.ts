import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import {
  GenericRepository,
  IGenericRepository,
} from '../Generic/generic.repository';

export interface ICartRepository extends IGenericRepository<User, {}, {}> {}

@Injectable()
export class CartRepository
  extends GenericRepository<User, {}, {}>
  implements ICartRepository {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }
}
