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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const groupService_1 = require("./groupService");
const swagger_1 = require("@nestjs/swagger");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    getGroups(groupIds) {
        return this.groupService.getGroups(groupIds);
    }
    getAllGroups() {
        return this.groupService.getAllGroups();
    }
    getGroupsByName(groupName) {
        return this.groupService.getGroupsByName(groupName);
    }
    getGroupUsers(groupId) {
        return this.groupService.getGroupUsers(groupId);
    }
    getGroupMessages(body) {
        const { groupId, pageIndex, pageSize } = body;
        return this.groupService.getGroupMessages(groupId, pageIndex, pageSize);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取聊天室' }),
    (0, common_1.Post)('getGroups'),
    __param(0, (0, common_1.Body)('groupIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroups", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取所有聊天室' }),
    (0, common_1.Get)('getAllGroups'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getAllGroups", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取聊天室详情' }),
    (0, common_1.Get)('findByName'),
    __param(0, (0, common_1.Query)('groupName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroupsByName", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取聊天室成员' }),
    (0, common_1.Get)('getGroupUsers'),
    __param(0, (0, common_1.Query)('grouId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroupUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取聊天消息' }),
    (0, common_1.Post)('groupMessages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroupMessages", null);
GroupController = __decorate([
    (0, swagger_1.ApiTags)('聊天室'),
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [groupService_1.GroupService])
], GroupController);
exports.GroupController = GroupController;
//# sourceMappingURL=groupController.js.map