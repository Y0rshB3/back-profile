import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'contact'
})
export class Contact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  @Column()
  email!: string;
  @Column()
  subject!: string;
  @Column({
    type: 'text'
  })
  message!: string;
}