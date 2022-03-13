import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/userEntity';
import { UserController } from './userController';
import { UserService } from './userService';
import { AuthModule } from '../auth/authModule';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
