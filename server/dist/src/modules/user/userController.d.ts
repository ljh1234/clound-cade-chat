import { UserService } from './userService';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(userId: number): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    login(body: any): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    register(body: any): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
}
