import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'infoDetailFromAbout'
})
export class InfoDetailFromAbout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;
  @Column()
  info!: string;
}