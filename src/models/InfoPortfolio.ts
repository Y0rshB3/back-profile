import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'infoPortfolio'
})
export class InfoPortfolio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  imgLink!: string;
  @Column()
  imgLinkLg!: string;
  @Column()
  title!: string;
  @Column()
  subTitle!: string;
  @Column()
  effect!: string;
  @Column()
  duration!: number;
  @Column()
  delay!: number;
}