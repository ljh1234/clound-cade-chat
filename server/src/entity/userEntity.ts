import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ default: 'liujunhua' })
  username: string;

  @Column({ default: '123456' })
  password: string;

  @Column({
    default: '',
  })
  avatar: string;

  @Column({ default: 0 })
  isDelete: number;

  @Column({ default: 'user' })
  nickName: string;

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number;

  @Column({ default: '' })
  salt: string

  @Column()
  groupIds: string
}
