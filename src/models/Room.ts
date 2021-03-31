import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import User from './User'

@Entity('rooms')
export default class Room {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'varchar' })
  map: string;

  @ManyToMany( () => User, user => user.id, { onDelete: 'SET NULL', onUpdate: 'CASCADE' } )
  @JoinTable()
  players: User[];

  @Column({ type: 'float' })
  capacity: number;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ nullable: true, type: 'date' })
  updatedAt: Date;

  @Column({ nullable: true, type: 'date' })
  deletedAt: Date;
}