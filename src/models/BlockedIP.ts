import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({
  name: 'blockedIP'
})
export class BlockedIP {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 45, unique: true })
  ipAddress!: string;

  @Column({ type: 'text' })
  reason!: string;

  @Column({ default: 3 })
  strikes!: number;

  @CreateDateColumn()
  blockedAt!: Date;
}
