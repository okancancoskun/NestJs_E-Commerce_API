import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { RegisterUserDto } from 'src/tools/dtos/user/registerUserDto';
import { UpdateUserDto } from 'src/tools/dtos/user/updateUserDto';
import { GenericService, IGenericService } from '../Generic/generic.service';
import { UserRepository } from './user.repository';

export interface IUserService
  extends IGenericService<User, RegisterUserDto, UpdateUserDto> {}
  
@Injectable()
export class UserService
  extends GenericService<User, RegisterUserDto, UpdateUserDto>
  implements IUserService {
  constructor(protected readonly repository: UserRepository) {
    super(repository);
  }
}
