"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const groupService_1 = require("./groupService");
const groupController_1 = require("./groupController");
const group_1 = require("../../entity/group");
const groupMessage_1 = require("../../entity/groupMessage");
const userEntity_1 = require("../../entity/userEntity");
let GroupModule = class GroupModule {
};
GroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([group_1.Group, groupMessage_1.GroupMessage, userEntity_1.User]),
        ],
        providers: [groupService_1.GroupService],
        controllers: [groupController_1.GroupController],
    })
], GroupModule);
exports.GroupModule = GroupModule;
//# sourceMappingURL=groupModule.js.map