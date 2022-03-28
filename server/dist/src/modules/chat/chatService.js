"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const userEntity_1 = require("../../entity/userEntity");
const group_1 = require("../../entity/group");
const groupMessage_1 = require("../../entity/groupMessage");
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = require("../utils");
let ChatService = class ChatService {
    constructor(userRepository, groupRepository, groupUserRepository, groupMessageRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.groupUserRepository = groupUserRepository;
        this.groupMessageRepository = groupMessageRepository;
    }
    async handleConnection(client) {
        const userRoom = client.handshake.query.userId;
        client.join(userRoom);
        this.server.emit('connection', 'connected');
        return '连接成功';
    }
    async handleDisconnect() {
        this.getActiveGroupUser();
    }
    async addGroup(client, data) {
        const isUser = await this.userRepository.findOne({ userId: data.creatorId });
        if (isUser) {
            const isHaveGroup = await this.groupRepository.findOne({ groupName: data.groupName });
            if (isHaveGroup) {
                this.server.to(data.creatorId + '').emit('addGroup', (0, utils_1.resBody)('FAIL', '该群名已存在', null));
                return;
            }
            const newGroup = {
                creatorId: data.creatorId,
                groupName: data.groupName
            };
            const createdGroup = await this.groupRepository.save(newGroup);
            const user = await this.userRepository.findOne({ userId: newGroup.creatorId });
            const groupIds = user.groupIds ? `${user.groupIds},${createdGroup.groupId}` : `${createdGroup.groupId}`;
            const newUser = Object.assign(Object.assign({}, user), { groupIds });
            await this.userRepository.save(newUser);
            client.join(createdGroup.groupId + '');
            this.server.to(createdGroup.groupId + '').emit('addGroup', (0, utils_1.resBody)('OK', '创建成功', { createdGroup }));
            this.getActiveGroupUser();
        }
        else {
            this.server.to(data.creatorId + '').emit('addGroup', (0, utils_1.resBody)('FAIL', '创建失败', null));
        }
    }
    async joinGroup(client, data) {
        console.log('joinGroup', typeof data);
        try {
            const isUser = await this.userRepository.findOne({ userId: data.userId });
            if (isUser) {
                const group = await this.groupRepository.findOne({ groupId: data.groupId });
                if (group) {
                    if (group.userIds.indexOf(`${data.userId}`) > -1)
                        return;
                    const userIds = group.userIds ? `${group.userIds},${data.userId}` : `${data.userId}`;
                    const modifyedGroup = Object.assign(Object.assign({}, group), { userIds });
                    console.log('modifyedGroup', modifyedGroup);
                    const newGroup = await this.groupRepository.save(modifyedGroup);
                    client.join(group.groupId + '');
                    this.server.to(group.groupId + '').emit('joinGroup', (0, utils_1.resBody)('OK', `${isUser.username}加入群${group.groupName}`, { group: newGroup }));
                    this.getActiveGroupUser();
                }
                else {
                    this.server.to(data.userId + '').emit('joinGroup', (0, utils_1.resBody)('FAIL', '进群失败', null));
                }
            }
            else {
                this.server.to(data.userId + '').emit('joinGroup', (0, utils_1.resBody)('FAIL', '无权限', null));
            }
        }
        catch (error) {
        }
    }
    async joinGroupSocket(client, data) {
        console.log('joinGroupSocket', data);
        const group = await this.groupRepository.findOne({ groupId: data.groupId });
        const user = await this.userRepository.findOne({ userId: data.userId });
        if (group && user) {
            client.join(`${group.groupId}`);
            const res = { group: group, user: user };
            this.server.to(`${group.groupId}`).emit('joinGroupSocket', (0, utils_1.resBody)('OK', `${user.username}加入群${group.groupName}`, { data: res }));
        }
        else {
            this.server.to(`${data.userId}`).emit('joinGroupSocket', (0, utils_1.resBody)('FAIL', '进群失败', null));
        }
    }
    async sendGroupMessage(data) {
        console.log('data', data);
        const isUser = await this.userRepository.findOne({ userId: data.userId });
        const userCached = {};
        if (isUser) {
            !userCached[data.userId] && (userCached[data.userId] = isUser);
            if (!data.groupId) {
                this.server.to(`${data.userId}`).emit('groupMessage', (0, utils_1.resBody)('FAIL', '消息发送错误', null));
                return;
            }
            if (data.messageType === 'image') {
                const randomName = `${Date.now()}$${data.userId}$${data.width}$${data.height}`;
                const stream = (0, fs_1.createWriteStream)((0, path_1.join)('public/static', randomName));
                stream.write(data.content);
                data.content = randomName;
            }
            data.time = new Date().valueOf();
            await this.groupMessageRepository.save(data);
            this.server.to(`${data.groupId}`).emit('groupMessage', (0, utils_1.resBody)('OK', '', { messageData: data, userInfo: userCached[data.userId] }));
        }
        else {
            this.server.to(`${data.userId}`).emit('groupMessage', (0, utils_1.resBody)('FAIL', '无权限', null));
        }
    }
    async getActiveGroupUser() {
        let userIdArr = Object.values(this.server.engine.clients).map(item => {
            return item.request._query.userId;
        });
        userIdArr = Array.from(new Set(userIdArr));
        const activeGroupUserGather = {};
        for (const userId of userIdArr) {
            const userGroupArr = await this.groupUserRepository.find({ userId: userId });
            const user = await this.userRepository.findOne({ userId: userId });
            if (user && userGroupArr.length) {
                userGroupArr.map(item => {
                    if (!activeGroupUserGather[item.groupId]) {
                        activeGroupUserGather[item.groupId] = {};
                    }
                    activeGroupUserGather[item.groupId][userId] = user;
                });
            }
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], ChatService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('addGroup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "addGroup", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinGroup'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "joinGroup", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinGroupSocket'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "joinGroupSocket", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('groupMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "sendGroupMessage", null);
ChatService = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, typeorm_1.InjectRepository)(userEntity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(group_1.Group)),
    __param(2, (0, typeorm_1.InjectRepository)(group_1.GroupMap)),
    __param(3, (0, typeorm_1.InjectRepository)(groupMessage_1.GroupMessage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chatService.js.map