interface GroupDto {
    groupId: number;
    userId: number;
    groupName: string;
    messages?: GroupMessageDto[];
    createTime: number;
}
interface GroupMessageDto {
    userId: number;
    groupId: number;
    content: string;
    width?: number;
    height?: number;
    messageType: string;
    time: number;
}
