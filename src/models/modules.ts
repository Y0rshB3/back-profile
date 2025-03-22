import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({
  name: 'modules'
})
export class Module {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;
  @Column({ type: "enum", enum: ["active", "inactive"], default: "active" })
  status!: "active" | "inactive";
  @Column({ type: "enum", enum: ["ES", "EN"], default: "ES" })
  language!: "ES" | "EN";
  @Column({ type: "text", nullable: true })
  description?: string;
}