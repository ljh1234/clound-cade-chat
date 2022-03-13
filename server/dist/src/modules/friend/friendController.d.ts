import { FriendService } from './friendService';
import { getFriendMessageBody } from 'src/common/requestBody';
export declare class FriendController {
    private readonly friendService;
    constructor(friendService: FriendService);
    getUsers(userId: number): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    getFriendMessage(params: getFriendMessageBody): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
}
