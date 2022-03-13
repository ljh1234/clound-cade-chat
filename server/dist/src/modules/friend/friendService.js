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
exports.FriendService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const friendMap_1 = require("../../entity/friendMap");
const friendMessage_1 = require("../../entity/friendMessage");
const utils_1 = require("../utils");
let FriendService = class FriendService {
    constructor(friendRepository, friendMessageRepository) {
        this.friendRepository = friendRepository;
        this.friendMessageRepository = friendMessageRepository;
    }
    async getFriends(userId) {
        try {
            if (userId) {
                return (0, utils_1.resBody)('OK', '获取用户组成功', this.friendRepository.find({ userId }));
            }
            else {
                return (0, utils_1.resBody)('FAIL', '获取用户好友失败', []);
            }
        }
        catch (e) {
            return (0, utils_1.resBody)('ERROR', '获取用户好友失败', e);
        }
    }
    async getFriendMessages(body) {
        const { userId, friendId, pageIndex, pageSize } = body;
        try {
            const messages = await this.friendMessageRepository
                .createQueryBuilder("friendMessage")
                .orderBy("friendMessage.time", "DESC")
                .where("friendMessage.userId = :userId AND friendMessage.friendId = :friendId", { userId, friendId })
                .orWhere("friendMessage.userId = :friendId AND friendMessage.friendId = :userId", { userId, friendId })
                .skip(pageIndex)
                .take(pageSize)
                .getMany();
            return (0, utils_1.resBody)('OK', '获取好友消息成功', { list: messages.reverse(), pageIndex, pageSize });
        }
        catch (e) {
            return (0, utils_1.resBody)('Error', '获取好友消息失败', e);
        }
    }
};
FriendService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(friendMap_1.FriendMap)),
    __param(1, (0, typeorm_2.InjectRepository)(friendMessage_1.FriendMessage)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], FriendService);
exports.FriendService = FriendService;
//# sourceMappingURL=friendService.js.map