import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/models/role.model';
import { CreateRoleDto } from 'src/tools/dtos/role/createRoleDto';
import { UpdateRoleDto } from 'src/tools/dtos/role/updateRoleDto';

import {
  GenericRepository,
  IGenericRepository,
} from '../Generic/generic.repository';

export interface IRoleRepository
  extends IGenericRepository<Role, CreateRoleDto, UpdateRoleDto> {}

@Injectable()
export class RoleRepository
  extends GenericRepository<Role, CreateRoleDto, UpdateRoleDto>
  implements IRoleRepository {
  constructor(@InjectModel(Role.name) roleModel: Model<Role>) {
    super(roleModel);
  }
}
