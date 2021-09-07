import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './User'

@Entity('transactions')
export default class Transactions {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  title: string;
  
  @Column({ type: 'varchar' })
  category: string;
  
  @Column({ type: 'varchar' })
  type: string;
 
  @Column({ type: 'varchar' })
  amount: number;

  @ManyToOne(() => User, user => user.messages, { onDelete: 'SET NULL', onUpdate: 'CASCADE', eager: true })
  user: User;

  @Column({ type: 'date' })
  createdAt: Date;
}