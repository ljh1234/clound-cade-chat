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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const index_1 = require("../utils/index");
const index_2 = require("../utils/index");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const userEntity_1 = require("../../entity/userEntity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            const hashedPassword = user.password;
            const salt = user.salt;
            const hashPassword = (0, index_1.encryptPassword)(password, salt);
            if (hashedPassword === hashPassword) {
                return {
                    code: 1,
                    user,
                };
            }
            else {
                return {
                    code: 2,
                    user: null,
                };
            }
        }
        return {
            code: 3,
            user: null,
        };
    }
    async certificate(user) {
        const payload = { username: user.username, sub: user.userId, nickName: user.nickName };
        try {
            const token = this.jwtService.sign(payload);
            return (0, index_2.resBody)('OK', '登录成功', { token, userInfo: { username: user.username, userId: user.userId, nickName: user.nickName, avatar: user.avatar, groupIds: user.groupIds } });
        }
        catch (error) {
            return (0, index_2.resBody)('ERROR', '账号或密码错误', null);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userEntity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map