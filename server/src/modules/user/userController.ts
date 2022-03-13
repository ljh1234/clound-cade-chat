import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './userService';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @Get('getUserInfo')
  getUsers(@Query('userId') userId: number) {
    return this.userService.getUser(userId);
  }

  @ApiOperation({ summary: '登录'})
  @Post('login')
  login(@Body() body: any) {
    console.log('controller user', body)
    return this.userService.login(body)
  }

  @ApiOperation({ summary: '注册'})
  @Post('register')
  register(@Body() body: any) {
    return this.userService.register(body)
  }
}
