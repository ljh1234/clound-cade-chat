import { Repository } from 'typeorm';
import { Group } from 'src/entity/group';
export declare class GroupService {
    private readonly groupRepository;
    constructor(groupRepository: Repository<Group>);
    getGroups(groupIds: string): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
    getGroupMessages(groupId: string, pageIndex: number, pageSize: number): Promise<{
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
