import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Group')
export class Group {
  @PrimaryGeneratedColumn()
  groupId: number;

  // 群组中的用户
  @Column()
  userIds: string;

  @Column()
  creatorId: number;

  @Column()
  groupName: string;

  @Column({type: 'double',default: new Date().valueOf()})
  createTime: number;
}

@Entity()
export class GroupMap {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  groupId: number;

  @Column()
  userId: number;
}
