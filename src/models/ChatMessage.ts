import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ChatUser } from './ChatUser';

@Entity({
  name: 'chatMessage'
})
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @ManyToOne(() => ChatUser, user => user.messages)
  @JoinColumn({ name: 'userId' })
  user!: ChatUser;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'text' })
  response!: string;

  @Column({ type: 'enum', enum: ['es', 'en', 'fr'], default: 'es' })
  language!: 'es' | 'en' | 'fr';

  @CreateDateColumn()
  timestamp!: Date;
}
