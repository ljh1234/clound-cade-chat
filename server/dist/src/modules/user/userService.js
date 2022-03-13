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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const userEntity_1 = require("../../entity/userEntity");
const utils_1 = require("../utils");
const authService_1 = require("../auth/authService");
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async getOneUserByName(username) {
        if (!username) {
            return Promise.reject();
        }
        return await this.userRepository.findOne({
            where: { username }
        });
    }
    async getOneUser(userId) {
        if (userId) {
            return await this.userRepository.findOne({
                where: { userId }
            });
        }
        return Promise.resolve(null);
    }
    async getUser(userId) {
        try {
            let data;
            if (userId) {
                data = await this.getOneUser(userId);
                return (0, utils_1.resBody)('OK', '获取用户成功', data);
            }
        }
        catch (e) {
            return (0, utils_1.resBody)('ERROR', '获取用户失败', e);
        }
    }
    async getUsers(userIds) {
        try {
            let friendInfo = [];
            if (userIds.length) {
                userIds.forEach(async (id) => {
                    const info = await this.getOneUser(id);
                    friendInfo.push(info);
                });
            }
            return (0, utils_1.resBody)('OK', '获取用户组成功', friendInfo);
        }
        catch (e) {
            return (0, utils_1.resBody)('ERROR', '获取用户组失败', e);
        }
    }
    async login(data) {
        const authResult = await this.authService.validateUser(data.username, data.password);
        console.log('authResult', authResult);
        switch (authResult.code) {
            case 1:
                return this.authService.certificate(authResult.user);
            case 2:
                return (0, utils_1.resBody)('FAIL', '账号或密码不正确', null);
            default:
                return (0, utils_1.resBody)('FAIL', '该账号未注册', null);
        }
    }
    async register(rg) {
        const isHave = await this.userRepository.find({ username: rg.username });
        if (isHave.length) {
            return (0, utils_1.resBody)('FAIL', '用户名已存在', null);
        }
        if (rg.password !== rg.confirmPassword) {
            return (0, utils_1.resBody)('FAIL', '两次密码不一致', null);
        }
        const salt = (0, utils_1.makeSalt)();
        const hashPwd = (0, utils_1.encryptPassword)(rg.password, salt);
        const user = {
            username: rg.username,
            password: hashPwd,
            avatar: rg.avatar,
            nickName: rg.nickName,
            salt: salt
        };
        console.log('user', user);
        const newUser = await this.userRepository.save(user);
        return (0, utils_1.resBody)('OK', '注册成功', null);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(userEntity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        authService_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map