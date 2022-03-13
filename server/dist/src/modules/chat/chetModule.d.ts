import { Group } from 'src/entity/group';
import { Repository } from 'typeorm';
export declare class ChatModule {
    private readonly groupRepository;
    constructor(groupRepository: Repository<Group>);
}
