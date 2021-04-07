import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/api/auth/auth.service';
import { User, userSchema } from 'src/models/user.model';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
    RoleModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
