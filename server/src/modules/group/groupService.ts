import { Inject, Injectable } from '@nestjs/common';
import { Repository, Like, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/entity/group';
import { GroupMessage } from 'src/entity/GroupMessage';
import { User } from 'src/entity/userEntity';
import { resBody } from '../utils/index'

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getGroups(groupIds: string) {
    try {
      if(groupIds) {
        const groupIdArr = groupIds.split(',');
        const groupArr = [];
        for(const groupId of groupIdArr) {
          const id = Number(groupId)
          const data = await this.groupRepository.findOne({ groupId: id });
          groupArr.push(data);
        }

        return resBody('OK', '获取群组成功', { groupInfos: groupArr })
      }

      return resBody('FAIL', '获取群组失败', null)
    } catch (e) {
      return resBody('ERROR', '获取群组失败', null)
    }
  }

  async getGroupUsers(groupId: number) {
    try {
      if (!groupId) {
        return resBody('FAIL', '获取群用户失败', null)
      }

      const group = await this.groupRepository.findOne({ groupId })
      const userId = group.userIds ? group.userIds.split(',').map(id => Number(id)) : []
      const userInfos = []

      if (userId.length) {
        userId.forEach(async (id) => {
          const user = await this.userRepository.findOne({ userId: id })

          userInfos.push({
            nickName: user.nickName,
            avatar: user.avatar,
            userId: user.userId
          })
        })

        return resBody('OK', '获取群组用户成功', userInfos)
      }
    } catch (error) {
      
    }
  }

  async getGroupMessages(groupId: number, pageIndex: number, pageSize: number) {
    let groupMessage = await getRepository(GroupMessage)
    .createQueryBuilder("groupMessage")
    .orderBy("groupMessage.time", "DESC")
    .where("groupMessage.groupId = :id", { id: groupId })
    .skip(pageIndex)
    .take(pageSize)
    .getMany();
    groupMessage = groupMessage.reverse();

    const userGather: {[key: string]: User} = {};
    let userArr = [];
    for(const message of groupMessage) {
      if(!userGather[message.userId]) {
        userGather[message.userId] = await getRepository(User)
        .createQueryBuilder("user")
        .where("user.userId = :id", { id: message.userId })
        .getOne();
      }
    }
    userArr = Object.values(userGather);

    return resBody('OK', '获取消息成功', { messageArr: groupMessage, userArr: userArr })
  }

  async getGroupsByName(groupName: string) {
    try {
      if(groupName) {
        const groups = await this.groupRepository.find({groupName: Like(`%${groupName}%`)});

        return resBody('OK', '查找成功', { groups })
      }

      return resBody('FAIL', '请输入请名称', null)
    } catch(e) {

      return resBody('ERROR', '查找错误', null)
    }
  }
}