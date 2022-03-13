import { Repository } from 'typeorm';
import { User } from 'src/entity/userEntity';
import { registerBody } from 'src/common/requestBody';
import { AuthService } from '../auth/authService';
export declare class UserService {
    private readonly userRepository;
    private readonly authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    getOneUserByName(username: string): Promise<User>;
    getOneUser(userId: number): Promise<any>;
    getUser(userId: number): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    getUsers(userIds: number[]): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    login(data: User): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    register(rg: registerBody): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
}
