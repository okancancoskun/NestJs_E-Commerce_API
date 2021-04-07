import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { LoginUserDto } from 'src/tools/dtos/user/loginUserDto';
import { RegisterUserDto } from 'src/tools/dtos/user/registerUserDto';
import { RoleService } from '../role/role.service';
import * as jwt from 'jsonwebtoken';
import environment from 'src/tools/environment';

export interface IAuthService {
  registerUser(dto: RegisterUserDto): Promise<User | HttpException>;
  loginUser(dto: LoginUserDto): Promise<{} | HttpException>;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly roleService: RoleService,
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<User | HttpException> {
    const user: User = await this.userModel.findOne({ email: dto.email });
    const defaultRole = await this.roleService.findOne({ name: 'user' }, {});
    if (!user) {
      if (dto.password !== dto.password2) {
        throw new HttpException(
          'Passwords are not same',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        delete dto.password2;
        const newUser = new this.userModel({
          ...dto,
          roleId: defaultRole._id,
          cartItems: [],
        });
        return await newUser.save();
      }
    } else {
      throw new HttpException('User Already Exist', HttpStatus.BAD_REQUEST);
    }
  }

  async loginUser(dto: LoginUserDto): Promise<{} | HttpException> {
    const isUserExist = await this.userModel
      .findOne({ email: dto.email })
      .populate('roleId');

    if (isUserExist) {
      const isSuccess = await compare(dto.password, isUserExist.password);
      if (isSuccess) {
        const { _id, email, roleId } = isUserExist;
        const token = jwt.sign(
          { _id: _id, email: email, role: roleId.name },
          environment.accessToken,
          { expiresIn: '24h' },
        );
        return {
          token,
          user: { _id, email, role: roleId.name },
        };
      } else {
        throw new HttpException(
          'Password is not correct',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
