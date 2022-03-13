import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FriendMap')
export class FriendMap {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  friendId: string;

  @Column()
  userId: number;
}