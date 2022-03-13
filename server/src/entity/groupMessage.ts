import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GroupMessage')
export class GroupMessage {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: number;

  @Column()
  groupId: number;

  @Column()
  content: string;

  @Column()
  messageType: string;

  @Column({ type: 'double' })
  time: number;
}