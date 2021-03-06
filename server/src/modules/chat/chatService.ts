import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/entity/userEntity'
import { Group, GroupMap } from 'src/entity/group'
import { GroupMessage } from 'src/entity/groupMessage'
import { createWriteStream } from 'fs'
import { join } from 'path'
import { resBody } from '../utils'
import { addGroupBody, joinGroupBody } from 'src/common/requestBody'
import { AnyRecord } from 'dns'

@WebSocketGateway()
export class ChatService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupMap)
    private readonly groupUserRepository: Repository<GroupMap>,
    @InjectRepository(GroupMessage)
    private readonly groupMessageRepository: Repository<GroupMessage>,
  ) {
    
  }

  @WebSocketServer() server;

  // socket连接钩子
  async handleConnection(client: Socket): Promise<string> {
    const userRoom = client.handshake.query.userId;

    client.join(userRoom)
    this.server.emit('connection', 'connected')
    return '连接成功'
  }

  // socket断连钩子
  async handleDisconnect():Promise<any> {
    this.getActiveGroupUser()
  }


  @SubscribeMessage('addGroup')
  async addGroup(client: Socket, data: addGroupBody):Promise<any> {
    const isUser = await this.userRepository.findOne({ userId: data.creatorId })
    if(isUser) {
      const isHaveGroup = await this.groupRepository.findOne({ groupName: data.groupName })
      if (isHaveGroup) {
        this.server.to(data.creatorId + '').emit('addGroup', resBody('FAIL', '该群名已存在', null))
        return
      }
      
      const newGroup = {
        creatorId: data.creatorId,
        groupName: data.groupName
      }

      const createdGroup = await this.groupRepository.save(newGroup)
      const user = await this.userRepository.findOne({ userId: newGroup.creatorId })
      const groupIds = user.groupIds ?  `${user.groupIds},${createdGroup.groupId}` : `${createdGroup.groupId}`
      const newUser = {
        ...user,
        groupIds
      }

      await this.userRepository.save(newUser)
      client.join(createdGroup.groupId + '')

      this.server.to(createdGroup.groupId + '').emit('addGroup', resBody('OK', '创建成功', { createdGroup }))
      this.getActiveGroupUser()
    } else{
      this.server.to(data.creatorId + '').emit('addGroup', resBody('FAIL', '创建失败', null))
    }
  }

  // 加入群组
  @SubscribeMessage('joinGroup')
  async joinGroup(@ConnectedSocket() client: Socket, @MessageBody() data: any):Promise<any> {
    console.log('joinGroup',typeof data);

    try {
      const isUser = await this.userRepository.findOne({userId: data.userId})

      if(isUser) {
        const group = await this.groupRepository.findOne({ groupId: data.groupId })

        if (group) {
          if (group.userIds.indexOf(`${data.userId}`) > -1) return
          const userIds = group.userIds ?  `${group.userIds},${data.userId}` : `${data.userId}`
          
          const modifyedGroup = {
            ...group,
            userIds
          }

          console.log('modifyedGroup', modifyedGroup)
          
          const newGroup = await this.groupRepository.save(modifyedGroup)
          client.join(group.groupId + '')
          this.server.to(group.groupId + '').emit('joinGroup', resBody('OK', `${isUser.username}加入群${group.groupName}`, { group: newGroup } ))
          this.getActiveGroupUser()
        } else {
          this.server.to(data.userId + '').emit('joinGroup', resBody('FAIL', '进群失败', null))
        }
      } else {
        this.server.to(data.userId + '').emit('joinGroup', resBody('FAIL', '无权限', null))
      }
    } catch (error) {
      
    }
    // const isUser = await this.userRepository.findOne({userId: data.userId})

    // if(isUser) {
    //   const group = await this.groupRepository.findOne({ groupId: data.groupId })

    //   if (group) {
    //     if (group.userIds.indexOf(`${data.userId}`) > -1) return
    //     const userIds = group.userIds ?  `${group.userIds},${data.userId}` : `${data.userId}`
    //     const modifyedGroup = {
    //       ...group,
    //       userIds
    //     }
        
    //     const newGroup = await this.groupRepository.save(modifyedGroup)
    //     client.join(group.groupId + '')
    //     this.server.to(group.groupId + '').emit('joinGroup', resBody('OK', `${isUser.username}加入群${group.groupName}`, { group: newGroup } ))
    //     this.getActiveGroupUser()
    //   } else {
    //     this.server.to(data.userId + '').emit('joinGroup', resBody('FAIL', '进群失败', null))
    //   }
    // } else {
    //   this.server.to(data.userId + '').emit('joinGroup', resBody('FAIL', '无权限', null))
    // }
  }

  // 加入群组的socket连接
  @SubscribeMessage('joinGroupSocket')
  async joinGroupSocket(@ConnectedSocket() client: Socket, @MessageBody() data: any):Promise<any> {
    console.log('joinGroupSocket', data)
    const group = await this.groupRepository.findOne({ groupId: data.groupId })
    const user = await this.userRepository.findOne({ userId: data.userId })

    if(group && user) {
      client.join(`${group.groupId}`)
      const res = { group: group, user: user}

      this.server.to(`${group.groupId}`).emit('joinGroupSocket', 
      resBody('OK', `${user.username}加入群${group.groupName}`, { data: res }))
    } else {
      this.server.to(`${data.userId}`).emit('joinGroupSocket', resBody('FAIL', '进群失败', null))
    }
  }

  // 发送群消息
  @SubscribeMessage('groupMessage')
  async sendGroupMessage(@MessageBody() data: any):Promise<any> {
    console.log('data', data);
    const isUser = await this.userRepository.findOne({ userId: data.userId })

    const userCached = {}

    if(isUser) {
      !userCached[data.userId] && (userCached[data.userId] = isUser)
      if(!data.groupId) {
        this.server.to(`${data.userId}`).emit('groupMessage', resBody('FAIL', '消息发送错误', null))
        return
      } 
      if(data.messageType === 'image') {
        const randomName = `${Date.now()}$${data.userId}$${data.width}$${data.height}`
        const stream = createWriteStream(join('public/static', randomName))

        stream.write(data.content)
        data.content = randomName
      }
      data.time = new Date().valueOf() // 使用服务端时间

      await this.groupMessageRepository.save(data)
    
      this.server.to(`${data.groupId}`).emit('groupMessage', resBody('OK', '', { messageData: data, userInfo: userCached[data.userId] }))
    } else {
      this.server.to(`${data.userId}`).emit('groupMessage', resBody('FAIL', '无权限', null))
    }
  }


  // 获取在线用户
  async getActiveGroupUser() {
    // 从socket中找到连接人数
    // @ts-ignore
    let userIdArr = Object.values(this.server.engine.clients).map(item=>{
      // @ts-ignore
      return item.request._query.userId
    })
    // 数组去重
    userIdArr = Array.from(new Set(userIdArr))

    const activeGroupUserGather = {}
    for(const userId of userIdArr) {
      const userGroupArr = await this.groupUserRepository.find({ userId: userId })
      const user = await this.userRepository.findOne({userId: userId})

      if(user && userGroupArr.length) {
        userGroupArr.map(item => {
          if(!activeGroupUserGather[item.groupId]) {
            activeGroupUserGather[item.groupId] = {}
          }
          activeGroupUserGather[item.groupId][userId] = user
        })
      }
    }

    // this.server.to(this.defaultGroup).emit('activeGroupUser',{
    //   msg: 'activeGroupUser', 
    //   data: activeGroupUserGather
    // })
  }
}
