import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './groupService';
import { GroupController } from './groupController';
import { Group } from 'src/entity/group';
import { GroupMessage } from 'src/entity/groupMessage';
import { User } from 'src/entity/userEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupMessage, User]),
  ],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}