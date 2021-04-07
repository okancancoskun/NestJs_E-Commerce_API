import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from 'src/api/role/role.service';
import { Role } from 'src/models/role.model';
import { CreateRoleDto } from 'src/tools/dtos/role/createRoleDto';
import { UpdateRoleDto } from 'src/tools/dtos/role/updateRoleDto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('')
  async findAll(): Promise<Role[]> {
    return await this.roleService.findAll({}, {});
  }

  @Post('create')
  async create(@Body() body: CreateRoleDto): Promise<Role> {
    return await this.roleService.create(body);
  }

  @Get(':id')
  async findOne(@Param() id: string): Promise<Role> {
    return await this.roleService.findOne({ _id: id }, {});
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateRoleDto,
  ): Promise<Role> {
    return await this.roleService.findByIdAndUpdate(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Role> {
    return await this.roleService.deleteOne(id);
  }
}
