import { Controller, Get, Post, Query, Body, UseGuards } from '@nestjs/common';
import { FriendService } from './friendService';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { getFriendMessageBody } from 'src/common/requestBody';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('好友')
@Controller('friend')
@UseGuards(AuthGuard('jwt'))
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @ApiOperation({ summary: '获取好友列表及信息' })
  @Get('getFriends')
  getUsers(@Query('userId') userId: number) {
    return this.friendService.getFriends(userId);
  }

  @ApiOperation({ summary: '获取指定好友消息'})
  @Post('getFriendMessage')
  getFriendMessage(@Body() params: getFriendMessageBody) {
    return this.friendService.getFriendMessages(params);
  }
}
