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
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chatService_1 = require("./chatService");
const userEntity_1 = require("../../entity/userEntity");
const group_1 = require("../../entity/group");
const groupMessage_1 = require("../../entity/groupMessage");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
let ChatModule = class ChatModule {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([userEntity_1.User, group_1.Group, group_1.GroupMap, groupMessage_1.GroupMessage])
        ],
        providers: [chatService_1.ChatService],
    }),
    __param(0, (0, typeorm_2.InjectRepository)(group_1.Group)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chetModule.js.map