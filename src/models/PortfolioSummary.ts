import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'portfolioSummary'
})
export class PortfolioSummary {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: ['about', 'skills_summary', 'experience_summary', 'projects_summary', 'contact', 'availability'],
  })
  section!: 'about' | 'skills_summary' | 'experience_summary' | 'projects_summary' | 'contact' | 'availability';

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'enum', enum: ['es', 'en', 'fr'], default: 'es' })
  language!: 'es' | 'en' | 'fr';

  @UpdateDateColumn()
  updatedAt!: Date;
}
