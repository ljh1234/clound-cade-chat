import { GroupService } from './groupService';
import { getGroupMessageBody } from 'src/common/requestBody';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    getGroups(groupIds: string): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    getGroupsByName(groupName: string): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    getGroupUsers(groupId: number): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    getGroupMessages(body: getGroupMessageBody): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
}
