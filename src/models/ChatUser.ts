import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ChatMessage } from './ChatMessage';

@Entity({
  name: 'chatUser'
})
export class ChatUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ length: 45 })
  ipAddress!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ default: false })
  blocked!: boolean;

  @Column({ default: 0 })
  strikeCount!: number;

  @OneToMany(() => ChatMessage, message => message.user)
  messages!: ChatMessage[];
}
