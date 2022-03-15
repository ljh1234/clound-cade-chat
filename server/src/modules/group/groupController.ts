import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { GroupService } from './groupService';
// import { AuthGuard } from '@nestjs/passport';
import { getGroupMessageBody } from 'src/common/requestBody';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('聊天室')
@Controller('group')
// @UseGuards(AuthGuard('jwt'))
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: '获取聊天室' })
  @Post('getGroups')
  getGroups(@Body('groupIds') groupIds: string) {
    return this.groupService.getGroups(groupIds);
  }

  @ApiOperation({ summary: '获取所有聊天室'})
  @Get('getAllGroups')
  getAllGroups() {
    return this.groupService.getAllGroups()
  }

  @ApiOperation({ summary: '获取聊天室详情' })
  @Get('findByName')
  getGroupsByName(@Query('groupName') groupName: string) {
    return this.groupService.getGroupsByName(groupName);
  }

  @ApiOperation({ summary: '获取聊天室成员' })
  @Get('getGroupUsers')
  getGroupUsers(@Query('grouId') groupId: number) {
    return this.groupService.getGroupUsers(groupId)
  }

  @ApiOperation({ summary: '获取聊天消息' })
  @Post('groupMessages')
  getGroupMessages(@Body() body: getGroupMessageBody) {
    const { groupId, pageIndex, pageSize } = body
    return this.groupService.getGroupMessages(groupId, pageIndex, pageSize);
  }
}