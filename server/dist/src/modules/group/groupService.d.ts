import { Repository } from 'typeorm';
import { Group } from 'src/entity/group';
import { User } from 'src/entity/userEntity';
export declare class GroupService {
    private readonly groupRepository;
    private readonly userRepository;
    constructor(groupRepository: Repository<Group>, userRepository: Repository<User>);
    getGroups(groupIds: string): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    getGroupUsers(groupId: number): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    getGroupMessages(groupId: number, pageIndex: number, pageSize: number): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    getGroupsByName(groupName: string): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
}
