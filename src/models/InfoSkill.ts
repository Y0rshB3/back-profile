import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity({
  name: 'infoSkill'
})
export class InfoSkill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  @Column()
  level!: number;
  @Column({ type: "enum", enum: ["Frontend", "Backend"], default: "Frontend" })
  category!: string;
  @Column()
  icon!: string;
  @Column({ type: "enum", enum: ["es", "en", "fr"], default: "es" })
  language!: "es" | "en" | "fr";
  @Column()
  order!: number;

  @BeforeInsert()
  setOrder() {
    // Aquí puedes implementar la lógica para auto completar el valor de 'order'
    // Por ejemplo, puedes asignar el valor máximo actual + 1
    this.order = Date.now(); // Ejemplo simple usando la marca de tiempo actual
  }
}