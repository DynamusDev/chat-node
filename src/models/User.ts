
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Chat from './Chat'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Chat, chat => chat.author, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  messages: Chat[];

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ nullable: true, type: 'date' })
  updatedAt: Date;

  @Column({ nullable: true, type: 'date' })
  deletedAt: Date;
}