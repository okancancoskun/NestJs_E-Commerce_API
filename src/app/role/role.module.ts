import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleRepository } from 'src/api/role/role.repository';
import { RoleService } from 'src/api/role/role.service';
import { Role, roleSchema } from 'src/models/role.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: roleSchema }]),
  ],
  providers: [RoleRepository, RoleService],
  exports: [RoleRepository, RoleService],
})
export class RoleModule {}
