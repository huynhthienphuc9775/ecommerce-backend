import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Type } from '../type/type.entity';

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  typeId: number;

  @ManyToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'typeId' })
  type: Type;

  @Column()
  imageUrl: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
