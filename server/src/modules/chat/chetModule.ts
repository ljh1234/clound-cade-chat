import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chatService';
import { User } from 'src/entity/userEntity';
import { Group, GroupMap } from 'src/entity/group';
import { GroupMessage } from 'src/entity/groupMessage';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Group, GroupMap, GroupMessage])
  ],
  providers: [ChatService],
})
export class ChatModule {}