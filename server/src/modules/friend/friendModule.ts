import { Module } from '@nestjs/common';
import { FriendController } from './friendController';
import { FriendService } from './friendService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendMap } from 'src/entity/friendMap';
import { FriendMessage } from 'src/entity/friendMessage';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendMap, FriendMessage]),
  ],
  controllers: [FriendController],
  providers: [FriendService]
})
export class FriendModule {}
