import 'dotenv/config';
import { AppDataSource } from '../config/typeormConfig';
import { PortfolioSummary } from '../models/PortfolioSummary';

/**
 * Seeder para PortfolioSummary
 * Carga datos iniciales optimizados para el chatbot AI
 */
export async function seedPortfolioSummary() {
  const summaryRepo = AppDataSource.getRepository(PortfolioSummary);

  // Datos en ESPAÑOL
  const spanishData = [
    {
      section: 'about',
      content: `Soy Jorge Becerra (y0rshb3), un desarrollador Full Stack apasionado por crear aplicaciones web modernas y funcionales. Tengo experiencia en desarrollo frontend y backend, con un enfoque en tecnologías JavaScript/TypeScript. Me especializo en crear interfaces de usuario intuitivas con React y desarrollar APIs robustas con Node.js. Siempre estoy buscando aprender nuevas tecnologías y mejorar mis habilidades.`,
      language: 'es'
    },
    {
      section: 'skills_summary',
      content: `Domino JavaScript/TypeScript tanto en frontend como backend. En el frontend trabajo con React, Next.js, TailwindCSS y Vite. En el backend utilizo Node.js, Express, TypeORM y MySQL. También tengo experiencia con Docker, Git, Socket.IO para aplicaciones en tiempo real, y estoy familiarizado con Python para scripting y automatización. Me apasiona el diseño pixel art y retro, como se puede ver en mi portafolio estilo Game Boy.`,
      language: 'es'
    },
    {
      section: 'experience_summary',
      content: `Tengo experiencia en desarrollo web Full Stack, creando aplicaciones desde cero incluyendo diseño, desarrollo, deployment y mantenimiento. He trabajado en proyectos personales y profesionales que involucran APIs RESTful, integración con bases de datos, autenticación de usuarios, y aplicaciones en tiempo real con WebSockets. También tengo experiencia desplegando aplicaciones en servidores Linux (Raspberry Pi) usando Docker y configurando CI/CD con GitHub Actions.`,
      language: 'es'
    },
    {
      section: 'projects_summary',
      content: `Mi proyecto principal es este portafolio personal con estética pixel art Game Boy, desarrollado con React + TypeScript en el frontend y Node.js + Express + MySQL en el backend. Incluye características como sistema de contacto con envío de emails, soporte multiidioma (español, inglés, francés), notificaciones de deployment en tiempo real con Socket.IO, y easter eggs interactivos con sistema de logros estilo Steam. El proyecto está desplegado en Raspberry Pi 4 con Docker y tiene CI/CD automatizado con GitHub Actions.`,
      language: 'es'
    },
    {
      section: 'contact',
      content: `Email: jebp91@hotmail.com
GitHub: https://github.com/Y0rshB3
Portfolio: Este mismo sitio web que estás viendo`,
      language: 'es'
    },
    {
      section: 'availability',
      content: `Estoy disponible para proyectos freelance y oportunidades de trabajo. Me interesan posiciones Full Stack con React y Node.js, proyectos desafiantes que me permitan aprender nuevas tecnologías, y colaboraciones en proyectos open source.`,
      language: 'es'
    }
  ];

  // Datos en INGLÉS
  const englishData = [
    {
      section: 'about',
      content: `I'm Jorge Becerra (y0rshb3), a Full Stack developer passionate about creating modern and functional web applications. I have experience in frontend and backend development, with a focus on JavaScript/TypeScript technologies. I specialize in creating intuitive user interfaces with React and developing robust APIs with Node.js. I'm always looking to learn new technologies and improve my skills.`,
      language: 'en'
    },
    {
      section: 'skills_summary',
      content: `I master JavaScript/TypeScript in both frontend and backend. On the frontend I work with React, Next.js, TailwindCSS and Vite. On the backend I use Node.js, Express, TypeORM and MySQL. I also have experience with Docker, Git, Socket.IO for real-time applications, and I'm familiar with Python for scripting and automation. I'm passionate about pixel art and retro design, as you can see in my Game Boy style portfolio.`,
      language: 'en'
    },
    {
      section: 'experience_summary',
      content: `I have experience in Full Stack web development, creating applications from scratch including design, development, deployment and maintenance. I've worked on personal and professional projects involving RESTful APIs, database integration, user authentication, and real-time applications with WebSockets. I also have experience deploying applications on Linux servers (Raspberry Pi) using Docker and setting up CI/CD with GitHub Actions.`,
      language: 'en'
    },
    {
      section: 'projects_summary',
      content: `My main project is this personal portfolio with Game Boy pixel art aesthetics, developed with React + TypeScript on the frontend and Node.js + Express + MySQL on the backend. It includes features like contact system with email sending, multi-language support (Spanish, English, French), real-time deployment notifications with Socket.IO, and interactive easter eggs with Steam-style achievement system. The project is deployed on Raspberry Pi 4 with Docker and has automated CI/CD with GitHub Actions.`,
      language: 'en'
    },
    {
      section: 'contact',
      content: `Email: jebp91@hotmail.com
GitHub: https://github.com/Y0rshB3
Portfolio: This website you're viewing right now`,
      language: 'en'
    },
    {
      section: 'availability',
      content: `I'm available for freelance projects and job opportunities. I'm interested in Full Stack positions with React and Node.js, challenging projects that allow me to learn new technologies, and collaborations on open source projects.`,
      language: 'en'
    }
  ];

  // Datos en FRANCÉS
  const frenchData = [
    {
      section: 'about',
      content: `Je suis Jorge Becerra (y0rshb3), un développeur Full Stack passionné par la création d'applications web modernes et fonctionnelles. J'ai de l'expérience en développement frontend et backend, avec un accent sur les technologies JavaScript/TypeScript. Je me spécialise dans la création d'interfaces utilisateur intuitives avec React et le développement d'APIs robustes avec Node.js. Je cherche toujours à apprendre de nouvelles technologies et à améliorer mes compétences.`,
      language: 'fr'
    },
    {
      section: 'skills_summary',
      content: `Je maîtrise JavaScript/TypeScript en frontend et backend. En frontend je travaille avec React, Next.js, TailwindCSS et Vite. En backend j'utilise Node.js, Express, TypeORM et MySQL. J'ai également de l'expérience avec Docker, Git, Socket.IO pour les applications en temps réel, et je connais Python pour le scripting et l'automatisation. Je suis passionné par le design pixel art et rétro, comme vous pouvez le voir dans mon portfolio style Game Boy.`,
      language: 'fr'
    },
    {
      section: 'experience_summary',
      content: `J'ai de l'expérience en développement web Full Stack, créant des applications from scratch incluant design, développement, déploiement et maintenance. J'ai travaillé sur des projets personnels et professionnels impliquant des APIs RESTful, intégration de bases de données, authentification utilisateur, et applications en temps réel avec WebSockets. J'ai aussi de l'expérience en déploiement d'applications sur serveurs Linux (Raspberry Pi) avec Docker et configuration CI/CD avec GitHub Actions.`,
      language: 'fr'
    },
    {
      section: 'projects_summary',
      content: `Mon projet principal est ce portfolio personnel avec esthétique pixel art Game Boy, développé avec React + TypeScript en frontend et Node.js + Express + MySQL en backend. Il inclut des fonctionnalités comme système de contact avec envoi d'emails, support multilingue (espagnol, anglais, français), notifications de déploiement en temps réel avec Socket.IO, et easter eggs interactifs avec système de succès style Steam. Le projet est déployé sur Raspberry Pi 4 avec Docker et a un CI/CD automatisé avec GitHub Actions.`,
      language: 'fr'
    },
    {
      section: 'contact',
      content: `Email: jebp91@hotmail.com
GitHub: https://github.com/Y0rshB3
Portfolio: Ce site web que vous regardez`,
      language: 'fr'
    },
    {
      section: 'availability',
      content: `Je suis disponible pour des projets freelance et opportunités d'emploi. Je suis intéressé par des positions Full Stack avec React et Node.js, des projets stimulants qui me permettent d'apprendre de nouvelles technologies, et des collaborations sur des projets open source.`,
      language: 'fr'
    }
  ];

  // Combinar todos los datos
  const allData = [...spanishData, ...englishData, ...frenchData];

  // Limpiar datos existentes (opcional)
  console.log('[Seed] Cleaning existing portfolio summary data...');
  await summaryRepo.clear();

  // Insertar datos
  console.log('[Seed] Inserting portfolio summary data...');
  for (const data of allData) {
    const summary = summaryRepo.create({
      section: data.section as any,
      content: data.content,
      language: data.language as any
    });
    await summaryRepo.save(summary);
    console.log(`  ✓ ${data.language} - ${data.section}`);
  }

  console.log(`[Seed] Portfolio summary seeded successfully! (${allData.length} entries)`);
}

// Ejecutar el seeder si se ejecuta directamente
if (require.main === module) {
  AppDataSource.initialize()
    .then(async () => {
      console.log('[Seed] Database connected');
      await seedPortfolioSummary();
      console.log('[Seed] Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('[Seed] Error:', error);
      process.exit(1);
    });
}
