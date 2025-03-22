import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'infoHome'
})
export class InfoHome {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  imgAuthor!: string;
  @Column()
  bgImgLink!: string;
  @Column()
  title!: string;
  @Column()
  text!: string;
}