import 'dotenv/config';
import { AppDataSource } from '../config/typeormConfig';
import { Jorge } from '../models/Jorge';

/**
 * Seeder para la tabla Jorge
 * Aquí puedes escribir toda tu información personal como desarrollador
 */
export async function seedJorge() {
  const jorgeRepo = AppDataSource.getRepository(Jorge);

  console.log('[Seed Jorge] Limpiando datos existentes...');
  await jorgeRepo.clear();

  console.log('[Seed Jorge] Insertando información...');

  // ESPAÑOL - Aquí escribe tu información real
  const spanishData = [
    {
      title: 'Mi Historia como Desarrollador',
      content: `Aquí puedes escribir toda tu historia: cómo empezaste en programación,
qué te motivó, tus primeros proyectos, desafíos que superaste, etc.

Ejemplo: "Comencé a programar a los X años cuando descubrí Python por curiosidad.
Mi primer proyecto fue un script para automatizar tareas..."`,
      language: 'es' as const
    },
    {
      title: 'Experiencia Técnica Detallada',
      content: `Describe en detalle tu experiencia con cada tecnología:
- React: X años, proyectos donde lo usaste, qué dominas
- Node.js: qué has construido, patrones que conoces
- Bases de datos: qué manejadores, experiencia con diseño de esquemas
- DevOps: Docker, CI/CD, deployment, etc.`,
      language: 'es' as const
    },
    {
      title: 'Proyectos Destacados',
      content: `Describe tus proyectos más importantes con detalle:
- Nombre del proyecto
- Problema que resuelve
- Tecnologías usadas
- Desafíos técnicos que enfrentaste
- Logros o métricas de éxito`,
      language: 'es' as const
    },
    {
      title: 'Metodologías y Mejores Prácticas',
      content: `Explica cómo trabajas:
- Metodologías ágiles que conoces (Scrum, Kanban, etc.)
- Testing (unit tests, integration tests, TDD)
- Code review, Git workflow
- Documentación
- Patrones de diseño que usas`,
      language: 'es' as const
    },
    {
      title: 'Objetivos y Aspiraciones',
      content: `Comparte tus metas profesionales:
- Qué tipo de proyectos te interesan
- Tecnologías que quieres aprender
- Áreas de especialización
- Tipo de empresa o equipo ideal`,
      language: 'es' as const
    }
  ];

  // INGLÉS - Traduce tu información
  const englishData = [
    {
      title: 'My Developer Journey',
      content: `Write your developer story in English...`,
      language: 'en' as const
    },
    {
      title: 'Detailed Technical Experience',
      content: `Describe your experience with each technology in detail...`,
      language: 'en' as const
    }
  ];

  // FRANCÉS - Traduce tu información
  const frenchData = [
    {
      title: 'Mon Parcours de Développeur',
      content: `Écrivez votre histoire en français...`,
      language: 'fr' as const
    }
  ];

  const allData = [...spanishData, ...englishData, ...frenchData];

  for (const data of allData) {
    const entry = jorgeRepo.create(data);
    await jorgeRepo.save(entry);
    console.log(`  ✓ ${data.language} - ${data.title}`);
  }

  console.log(`[Seed Jorge] ¡Completado! (${allData.length} entradas)`);
}

// Ejecutar el seeder si se ejecuta directamente
if (require.main === module) {
  AppDataSource.initialize()
    .then(async () => {
      console.log('[Seed Jorge] Base de datos conectada');
      await seedJorge();
      console.log('[Seed Jorge] ¡Listo!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('[Seed Jorge] Error:', error);
      process.exit(1);
    });
}
