import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum InvitationType {
  WEDDING = 'wedding',
  BIRTHDAY = 'birthday',
}

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: InvitationType })
  type: InvitationType;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
