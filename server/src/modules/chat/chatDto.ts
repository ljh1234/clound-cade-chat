// 群组
interface GroupDto {
  groupId: number;
  userId: number; // 群主id
  groupName: string;
  messages?: GroupMessageDto[];
  createTime: number;
}

// 群消息
interface GroupMessageDto {
  userId: number;
  groupId: number;
  content: string;
  width?: number;
  height?: number;
  messageType: string;
  time: number;
}