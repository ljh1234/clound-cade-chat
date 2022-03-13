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
exports.FriendController = void 0;
const common_1 = require("@nestjs/common");
const friendService_1 = require("./friendService");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    getUsers(userId) {
        return this.friendService.getFriends(userId);
    }
    getFriendMessage(params) {
        return this.friendService.getFriendMessages(params);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取好友列表及信息' }),
    (0, common_1.Get)('getFriends'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取指定好友消息' }),
    (0, common_1.Post)('getFriendMessage'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "getFriendMessage", null);
FriendController = __decorate([
    (0, swagger_1.ApiTags)('好友'),
    (0, common_1.Controller)('friend'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [friendService_1.FriendService])
], FriendController);
exports.FriendController = FriendController;
//# sourceMappingURL=friendController.js.map