
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './User'

@Entity('chat')
export default class Chat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  message: string;

  @ManyToOne(() => User, user => user.messages, { onDelete: 'SET NULL', onUpdate: 'CASCADE', eager: true })
  author: User;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ nullable: true, type: 'date' })
  updatedAt: Date;

  @Column({ nullable: true, type: 'date' })
  deletedAt: Date;
}