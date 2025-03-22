import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'infoSkill'
})
export class InfoSkill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;
  @Column()
  progress!: string;
  @Column()
  effect!: string;
  @Column()
  duration!: number;
  @Column()
  delay!: number;
}