import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from 'src/entity/userEntity';
import { Group, GroupMap } from 'src/entity/group';
import { GroupMessage } from 'src/entity/groupMessage';
import { addGroupBody, joinGroupBody } from 'src/common/requestBody';
export declare class ChatService {
    private readonly userRepository;
    private readonly groupRepository;
    private readonly groupUserRepository;
    private readonly groupMessageRepository;
    constructor(userRepository: Repository<User>, groupRepository: Repository<Group>, groupUserRepository: Repository<GroupMap>, groupMessageRepository: Repository<GroupMessage>);
    server: any;
    handleConnection(client: Socket): Promise<string>;
    handleDisconnect(): Promise<any>;
    addGroup(client: Socket, data: addGroupBody): Promise<any>;
    joinGroup(client: Socket, data: joinGroupBody): Promise<any>;
    joinGroupSocket(client: Socket, data: GroupMap): Promise<any>;
    sendGroupMessage(data: GroupMessageDto): Promise<any>;
    getActiveGroupUser(): Promise<void>;
}
