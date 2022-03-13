import { Repository } from 'typeorm';
import { FriendMap } from 'src/entity/friendMap';
import { FriendMessage } from 'src/entity/friendMessage';
import { getFriendMessageBody } from 'src/common/requestBody';
export declare class FriendService {
    private readonly friendRepository;
    private readonly friendMessageRepository;
    constructor(friendRepository: Repository<FriendMap>, friendMessageRepository: Repository<FriendMessage>);
    getFriends(userId: number): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    getFriendMessages(body: getFriendMessageBody): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
}
