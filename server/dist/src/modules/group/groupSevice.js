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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const group_1 = require("../../entity/group");
const GroupMessage_1 = require("../../entity/GroupMessage");
const userEntity_1 = require("../../entity/userEntity");
const index_1 = require("../utils/index");
let GroupService = class GroupService {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    async getGroups(groupIds) {
        try {
            if (groupIds) {
                const groupIdArr = groupIds.split(',');
                const groupArr = [];
                for (const groupId of groupIdArr) {
                    const id = Number(groupId);
                    const data = await this.groupRepository.findOne({ groupId: id });
                    groupArr.push(data);
                }
                return (0, index_1.resBody)('OK', '获取群组成功', { groupInfos: groupArr });
            }
            return (0, index_1.resBody)('FAIL', '获取群组失败', null);
        }
        catch (e) {
            return (0, index_1.resBody)('ERROR', '获取群组失败', null);
        }
    }
    async getGroupMessages(groupId, pageIndex, pageSize) {
        let groupMessage = await (0, typeorm_1.getRepository)(GroupMessage_1.GroupMessage)
            .createQueryBuilder("groupMessage")
            .orderBy("groupMessage.time", "DESC")
            .where("groupMessage.groupId = :id", { id: groupId })
            .skip(pageIndex)
            .take(pageSize)
            .getMany();
        groupMessage = groupMessage.reverse();
        const userGather = {};
        let userArr = [];
        for (const message of groupMessage) {
            if (!userGather[message.userId]) {
                userGather[message.userId] = await (0, typeorm_1.getRepository)(userEntity_1.User)
                    .createQueryBuilder("user")
                    .where("user.userId = :id", { id: message.userId })
                    .getOne();
            }
        }
        userArr = Object.values(userGather);
        return (0, index_1.resBody)('OK', '获取消息成功', { messageArr: groupMessage, userArr: userArr });
    }
    async getGroupsByName(groupName) {
        try {
            if (groupName) {
                const groups = await this.groupRepository.find({ groupName: (0, typeorm_1.Like)(`%${groupName}%`) });
                return (0, index_1.resBody)('OK', '查找成功', { groups });
            }
            return (0, index_1.resBody)('FAIL', '请输入请名称', null);
        }
        catch (e) {
            return (0, index_1.resBody)('ERROR', '查找错误', null);
        }
    }
};
GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(group_1.Group)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=groupSevice.js.map