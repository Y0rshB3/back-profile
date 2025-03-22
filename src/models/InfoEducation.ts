import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'infoEducation'
})
export class InfoEducation {
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