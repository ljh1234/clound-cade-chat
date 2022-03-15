export interface getFriendMessageBody {
  userId: number, 
  friendId: number,
  pageIndex: number,
  pageSize: number
}

export interface getGroupMessageBody {
  groupId: number,
  pageIndex: number,
  pageSize: number
}

export interface addGroupBody {
  creatorId: number,
  groupName: string
}

export interface joinGroupBody {
  userId: number,
  groupId: number
}

export interface registerBody {
  username: string,
  password: string,
  confirmPassword: string,
  avatar: string,
  nickName: string
}