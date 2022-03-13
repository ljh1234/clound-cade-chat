import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/userEntity';
import { resBody, makeSalt, encryptPassword } from '../utils';
import { registerBody } from 'src/common/requestBody';
import { AuthService } from '../auth/authService';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {}

  async getOneUserByName(username: string): Promise<User> {
    if (!username) {
      return Promise.reject()
    }

    return await this.userRepository.findOne({
      where: { username}
    })
  }

  async getOneUser(userId: number) {
    if (userId) {
      return await this.userRepository.findOne({
        where: { userId }
      })
    }

    return Promise.resolve(null)
  }

  async getUser(userId: number) {
    try {
      let data;
      if (userId) {
        data = await this.getOneUser(userId)

        return resBody('OK', '获取用户成功', data)
      }
    } catch (e) {
      return resBody('ERROR', '获取用户失败', e)
    }
  }

  async getUsers(userIds: number[]) {
    try {
        let friendInfo: User[] = []

        if (userIds.length) {
          userIds.forEach(async (id) => {
            const info = await this.getOneUser(id)

            friendInfo.push(info)
          })
        }

        return resBody('OK', '获取用户组成功', friendInfo)
    } catch (e) {
      return resBody('ERROR', '获取用户组失败', e)
    }
  }

  async login(data: User) {
    const authResult = await this.authService.validateUser(data.username, data.password);
    console.log('authResult', authResult)
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return resBody('FAIL', '账号或密码不正确', null)
      default:
        return resBody('FAIL', '该账号未注册', null)
    }
  }

  async register(rg: registerBody) {
    const isHave = await this.userRepository.find({ username: rg.username });
    if(isHave.length) {
      return resBody('FAIL', '用户名已存在', null)
    }

    if (rg.password !== rg.confirmPassword) {
      return resBody('FAIL', '两次密码不一致', null)
    }

    const salt = makeSalt()
    const hashPwd = encryptPassword(rg.password, salt); 
    const user = {
      username: rg.username,
      password: hashPwd,
      avatar: rg.avatar,
      nickName: rg.nickName,
      salt: salt
    }

    console.log('user', user)
    const newUser = await this.userRepository.save(user);
    
    return resBody('OK', '注册成功', null)
  }
}
