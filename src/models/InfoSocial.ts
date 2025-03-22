import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
export enum Type {
  PRIMARY = "primary",
  SECUNDARY = "secundary"
}


@Entity({
  name: 'infoSocial'
})
export class InfoSocial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  icon!: string;
  @Column()
  title!: string;
  @Column()
  link!: string;
  @Column({
    type: "enum",
    enum: Type,
    default: Type.PRIMARY
  })
  type!: Type;
}