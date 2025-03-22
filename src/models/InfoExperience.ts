import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'infoExperience'
})
export class InfoExperience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;
  @Column()
  duration!: string;
  @Column()
  subTitle!: string;
  @Column()
  text!: string;
}