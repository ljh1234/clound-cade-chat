import { ResponseCode } from "src/common/responseCode";
import * as crypto from 'crypto';

export function resBody(status: string, msg: string, data: any) {
  return { 
    code: ResponseCode[status],
    msg,
    data
  }
}

// 创建密码盐
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

// 加密密码
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}
