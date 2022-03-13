import { Injectable, Res } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendMap } from 'src/entity/friendMap';
import { FriendMessage } from 'src/entity/friendMessage';
import { getFriendMessageBody } from 'src/common/requestBody';
import { resBody } from '../utils';


@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendMap)
    private readonly friendRepository: Repository<FriendMap>,
    @InjectRepository(FriendMessage)
    private readonly friendMessageRepository: Repository<FriendMessage>,
  ){}

  async getFriends(userId: number) {
    try {
      if(userId) {
        return resBody('OK', '获取用户组成功', this.friendRepository.find({ userId }))
      } else {
        return resBody('FAIL', '获取用户好友失败', [])
      }
    } catch(e) {
      return resBody('ERROR', '获取用户好友失败', e)
    }
  }

  async getFriendMessages(body: getFriendMessageBody) {
    const { userId, friendId, pageIndex, pageSize } = body

    try {
      const messages = await this.friendMessageRepository
      .createQueryBuilder("friendMessage")
      .orderBy("friendMessage.time", "DESC")
      .where("friendMessage.userId = :userId AND friendMessage.friendId = :friendId", { userId, friendId })
      .orWhere("friendMessage.userId = :friendId AND friendMessage.friendId = :userId", { userId, friendId })
      .skip(pageIndex)
      .take(pageSize)
      .getMany()

      return resBody('OK', '获取好友消息成功', { list: messages.reverse(), pageIndex, pageSize })
    } catch (e) {
      return resBody('Error', '获取好友消息失败', e)
    }
  }
}