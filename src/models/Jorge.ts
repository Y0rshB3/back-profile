import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

/**
 * Tabla personal de Jorge - Información detallada del desarrollador
 * Texto libre para que el chatbot tenga contexto completo
 */
@Entity({
  name: 'jorge'
})
export class Jorge {
  @PrimaryGeneratedColumn()
  id!: number;

  // Título o tema del texto
  @Column({ length: 200 })
  title!: string;

  // Todo el contenido en texto libre
  @Column({ type: 'longtext' })
  content!: string;

  // Idioma del contenido
  @Column({ type: 'enum', enum: ['es', 'en', 'fr'], default: 'es' })
  language!: 'es' | 'en' | 'fr';

  @UpdateDateColumn()
  updatedAt!: Date;
}
