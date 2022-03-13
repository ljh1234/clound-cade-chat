// src/logical/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../utils/index';
import { resBody } from '../utils/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/userEntity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  // 校验用户信息
  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } })
    if (user) {
      const hashedPassword = user.password;
      const salt = user.salt;
      const hashPassword = encryptPassword(password, salt);

      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  async certificate(user: any) {
    const payload = { username: user.username, sub: user.userId, nickName: user.nickName }
    try {
      const token = this.jwtService.sign(payload)

      return resBody('OK', '登录成功', { token, userInfo: { username: user.username, userId: user.userId, nickName: user.nickName, avatar: user.avatar, groupIds: user.groupIds } })
    } catch (error) {
      return resBody('ERROR', '账号或密码错误', null)
    }
  }
}