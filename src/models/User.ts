
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Chat from './Chat'
import Transaction from './Transaction';

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

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @OneToMany(() => Chat, chat => chat.author, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  messages: Chat[];

  @OneToMany(() => Transaction, transaction => transaction.user, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  transactions: Transaction[];

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ nullable: true, type: 'date' })
  updatedAt: Date;

  @Column({ nullable: true, type: 'date' })
  deletedAt: Date;
}