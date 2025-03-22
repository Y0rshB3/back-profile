import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'infoFormContact'
})
export class InfoFormContact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  formTitle!: string;
  @Column()
  title!: string;
  @Column()
  subTitle!: string;
  @Column()
  text!: string;
}