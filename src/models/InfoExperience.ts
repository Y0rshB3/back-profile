import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'infoExperience'
})
export class InfoExperience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company!: string;
  @Column()
  position!: string;
  @Column()
  startDate!: string;
  @Column({ nullable: true })
  endDate!: string | null;
  @Column({ type: "text" })
  description!: string;
  @Column("simple-array")
  technologies!: string[];
  @Column({ type: "enum", enum: ["es", "en", "fr"], default: "es" })
  language!: "es" | "en" | "fr";

}