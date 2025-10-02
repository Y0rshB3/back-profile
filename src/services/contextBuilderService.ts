import { AppDataSource } from '../config/typeormConfig';
import { PortfolioSummary } from '../models/PortfolioSummary';
import { InfoSkill } from '../models/InfoSkill';
import { InfoExperience } from '../models/InfoExperience';
import { InfoPortfolio } from '../models/InfoPortfolio';

const MAX_CONTEXT_TOKENS = parseInt(process.env.MAX_CONTEXT_TOKENS || '2000');

/**
 * Construye el contexto dinámico para la IA basado en la pregunta del usuario
 * @param query Pregunta del usuario
 * @param language Idioma ('es' | 'en' | 'fr')
 * @returns Contexto formateado para la IA
 */
export async function buildContext(query: string, language: string = 'es'): Promise<string> {
  const lowerQuery = query.toLowerCase();
  let context = '';

  try {
    // Siempre incluir el resumen general (about)
    const aboutSummary = await getPortfolioSummary('about', language);
    if (aboutSummary) {
      context += `=== SOBRE MÍ ===\n${aboutSummary}\n\n`;
    }

    // Detectar si pregunta sobre skills/tecnologías
    if (
      lowerQuery.includes('skill') ||
      lowerQuery.includes('tecnolog') ||
      lowerQuery.includes('lenguaje') ||
      lowerQuery.includes('framework') ||
      lowerQuery.includes('domina') ||
      lowerQuery.includes('sabe') ||
      lowerQuery.includes('conoce') ||
      lowerQuery.includes('language') ||
      lowerQuery.includes('technology')
    ) {
      const skillsSummary = await getPortfolioSummary('skills_summary', language);
      if (skillsSummary) {
        context += `=== HABILIDADES ===\n${skillsSummary}\n\n`;
      }

      // Buscar skills específicos si pregunta por algo concreto
      const skills = await getSkills(language);
      if (skills.length > 0) {
        context += `=== SKILLS DETALLADOS ===\n`;
        skills.forEach(skill => {
          context += `- ${skill.name} (${skill.category}): Nivel ${skill.level}/10\n`;
        });
        context += '\n';
      }
    }

    // Detectar si pregunta sobre experiencia/trabajo
    if (
      lowerQuery.includes('experiencia') ||
      lowerQuery.includes('trabajo') ||
      lowerQuery.includes('empresa') ||
      lowerQuery.includes('puesto') ||
      lowerQuery.includes('rol') ||
      lowerQuery.includes('experience') ||
      lowerQuery.includes('job') ||
      lowerQuery.includes('company') ||
      lowerQuery.includes('position')
    ) {
      const expSummary = await getPortfolioSummary('experience_summary', language);
      if (expSummary) {
        context += `=== EXPERIENCIA ===\n${expSummary}\n\n`;
      }

      // Obtener últimas 3 experiencias
      const experiences = await getExperiences(language, 3);
      if (experiences.length > 0) {
        context += `=== EXPERIENCIAS DETALLADAS ===\n`;
        experiences.forEach(exp => {
          const endDate = exp.endDate || (language === 'es' ? 'Presente' : language === 'en' ? 'Present' : 'Présent');
          context += `\n**${exp.position}** en ${exp.company}\n`;
          context += `Período: ${exp.startDate} - ${endDate}\n`;
          context += `Descripción: ${exp.description}\n`;
          context += `Tecnologías: ${exp.technologies.join(', ')}\n`;
        });
        context += '\n';
      }
    }

    // Detectar si pregunta sobre proyectos
    if (
      lowerQuery.includes('proyecto') ||
      lowerQuery.includes('portafolio') ||
      lowerQuery.includes('portfolio') ||
      lowerQuery.includes('project') ||
      lowerQuery.includes('trabajo') ||
      lowerQuery.includes('desarrollado') ||
      lowerQuery.includes('created') ||
      lowerQuery.includes('built')
    ) {
      const projectsSummary = await getPortfolioSummary('projects_summary', language);
      if (projectsSummary) {
        context += `=== PROYECTOS ===\n${projectsSummary}\n\n`;
      }

      // Obtener proyectos destacados
      const projects = await getProjects(language, 3);
      if (projects.length > 0) {
        context += `=== PROYECTOS DESTACADOS ===\n`;
        projects.forEach(proj => {
          context += `\n**${proj.title}**\n`;
          context += `Descripción: ${proj.subTitle}\n`;
        });
        context += '\n';
      }
    }

    // Detectar si pregunta sobre contacto/disponibilidad
    if (
      lowerQuery.includes('contacto') ||
      lowerQuery.includes('email') ||
      lowerQuery.includes('disponib') ||
      lowerQuery.includes('contratar') ||
      lowerQuery.includes('contact') ||
      lowerQuery.includes('available') ||
      lowerQuery.includes('hire')
    ) {
      const contactInfo = await getPortfolioSummary('contact', language);
      if (contactInfo) {
        context += `=== CONTACTO ===\n${contactInfo}\n\n`;
      }

      const availability = await getPortfolioSummary('availability', language);
      if (availability) {
        context += `=== DISPONIBILIDAD ===\n${availability}\n\n`;
      }
    }

    // Si el contexto está vacío, agregar al menos el resumen general
    if (context.trim() === '') {
      const generalSummary = await getPortfolioSummary('about', language);
      context = generalSummary || 'No hay información disponible en este momento.';
    }

    // Limitar el tamaño del contexto (estimación: ~4 caracteres por token)
    const maxChars = MAX_CONTEXT_TOKENS * 4;
    if (context.length > maxChars) {
      context = context.substring(0, maxChars) + '...';
    }

    return context;
  } catch (error) {
    console.error('Error building context:', error);
    return 'Error al construir el contexto. Por favor intenta de nuevo.';
  }
}

/**
 * Obtiene un resumen del portfolio por sección
 */
async function getPortfolioSummary(section: string, language: string): Promise<string | null> {
  const summaryRepo = AppDataSource.getRepository(PortfolioSummary);
  const summary = await summaryRepo.findOne({
    where: { section: section as any, language: language as any }
  });
  return summary?.content || null;
}

/**
 * Obtiene skills del usuario
 */
async function getSkills(language: string, limit: number = 10): Promise<InfoSkill[]> {
  const skillRepo = AppDataSource.getRepository(InfoSkill);
  return await skillRepo.find({
    where: { language: language as any },
    order: { level: 'DESC' },
    take: limit
  });
}

/**
 * Obtiene experiencias del usuario
 */
async function getExperiences(language: string, limit: number = 3): Promise<InfoExperience[]> {
  const expRepo = AppDataSource.getRepository(InfoExperience);
  return await expRepo.find({
    where: { language: language as any },
    order: { id: 'DESC' }, // Más recientes primero
    take: limit
  });
}

/**
 * Obtiene proyectos del usuario
 */
async function getProjects(language: string, limit: number = 3): Promise<InfoPortfolio[]> {
  const projectRepo = AppDataSource.getRepository(InfoPortfolio);
  return await projectRepo.find({
    where: { language: language as any },
    take: limit
  });
}
