import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { GroupService } from './groupService';
import { AuthGuard } from '@nestjs/passport';
import { getGroupMessageBody } from 'src/common/requestBody';

@Controller('group')
@UseGuards(AuthGuard('jwt'))
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('getGroups')
  getGroups(@Body('groupIds') groupIds: string) {
    return this.groupService.getGroups(groupIds);
  }

  @Get('findByName')
  getGroupsByName(@Query('groupName') groupName: string) {
    return this.groupService.getGroupsByName(groupName);
  }

  @Get('getGroupUsers')
  getGroupUsers(@Query('grouId') groupId: number) {
    return this.groupService.getGroupUsers(groupId)
  }

  @Post('groupMessages')
  getGroupMessages(@Body() body: getGroupMessageBody) {
    const { groupId, pageIndex, pageSize } = body
    return this.groupService.getGroupMessages(groupId, pageIndex, pageSize);
  }
}