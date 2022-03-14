"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const userModule_1 = require("./modules/user/userModule");
const friendModule_1 = require("./modules/friend/friendModule");
const chetModule_1 = require("./modules/chat/chetModule");
const groupModule_1 = require("./modules/group/groupModule");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    type: 'mysql',
                    entities: [(0, path_1.join)(__dirname, './entity/*.{ts,js}')],
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 3306),
                    username: configService.get('DB_USER', 'root'),
                    password: configService.get('DB_PASSWORD', '147896325'),
                    database: configService.get('DB_DATABASE', 'cloundcade_chat'),
                    timezone: '+08:00',
                    synchronize: true,
                }),
            }),
            userModule_1.UserModule,
            friendModule_1.FriendModule,
            chetModule_1.ChatModule,
            groupModule_1.GroupModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map