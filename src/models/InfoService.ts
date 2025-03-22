import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'infoService'
})
export class InfoService {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  imgLink!: string;
  @Column()
  title!: string;
  @Column()
  text!: string;
  @Column()
  effect!: string;
  @Column()
  duration!: number;
  @Column()
  delay!: number;
}