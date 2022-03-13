"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendModule = void 0;
const common_1 = require("@nestjs/common");
const friendController_1 = require("./friendController");
const friendService_1 = require("./friendService");
const typeorm_1 = require("@nestjs/typeorm");
const friendMap_1 = require("../../entity/friendMap");
const friendMessage_1 = require("../../entity/friendMessage");
let FriendModule = class FriendModule {
};
FriendModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([friendMap_1.FriendMap, friendMessage_1.FriendMessage]),
        ],
        controllers: [friendController_1.FriendController],
        providers: [friendService_1.FriendService]
    })
], FriendModule);
exports.FriendModule = FriendModule;
//# sourceMappingURL=friendModule.js.map