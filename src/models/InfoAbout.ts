import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'infoAbout'
})
export class InfoAbout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  imgLink!: string;
  @Column()
  cvPdf!: string;
  @Column()
  title!: string;
  @Column()
  subtitle!: string;
  @Column()
  text!: string;
}