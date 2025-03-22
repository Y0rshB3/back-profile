import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoAbout } from '../models/InfoAbout';
import { InfoDetailFromAbout } from '../models/InfoDetailFromAbout';
import { InfoEducation } from '../models/InfoEducation';
import { InfoExperience } from '../models/InfoExperience';
import { InfoSkill } from '../models/InfoSkill';
import { InfoSocial } from '../models/InfoSocial';
import { InfoHomeSkill } from '../models/InfoHomeSkill';
import { InfoPortfolio } from '../models/InfoPortfolio';
import { InfoFormContact } from '../models/InfoFormContact';
import { InfoHome } from '../models/InfoHome';
import { InfoService } from '../models/InfoService';

export async function getResume(req: Request, res: Response): Promise<void> {
  const aboutRepository = AppDataSource.getRepository(InfoAbout).createQueryBuilder('infoAbout');
  const detailFromAboutRepository = AppDataSource.getRepository(InfoDetailFromAbout);
  const educationRepository = AppDataSource.getRepository(InfoEducation);
  const experienceRepository = AppDataSource.getRepository(InfoExperience);
  const skillRepository = AppDataSource.getRepository(InfoSkill);
  const socialRepository = AppDataSource.getRepository(InfoSocial);
  const homeSkillRepository = AppDataSource.getRepository(InfoHomeSkill).createQueryBuilder('infoHomeSkill');
  const portfolioRepository = AppDataSource.getRepository(InfoPortfolio);
  const formContactRepository = AppDataSource.getRepository(InfoFormContact).createQueryBuilder('infoFormContact');
  const homeRepository = AppDataSource.getRepository(InfoHome).createQueryBuilder('infoHome');
  const serviceRepository = AppDataSource.getRepository(InfoService);
  res.json({
    heroData: {
      homeThreeHero: await homeRepository.getOne(),
    },
    aboutData: {
      ...await aboutRepository.getOne(),
      details: await detailFromAboutRepository.find(),
    },
    serviceData: {
      services: await serviceRepository.find(),
    },
    skillData: {
      ...await homeSkillRepository.getOne(),
      skills: await skillRepository.find(),
    },
    portfolioData: {
      portfolioItems: await portfolioRepository.find(),
    },
    resumeData: {
      experienceTitle: "Experience",
      experience: await experienceRepository.find(),
      educationTitle: "Education",
      education: await educationRepository.find(),
    },
    contactData: await formContactRepository.getOne(),
    socialData: await socialRepository.find({
      where: {type: "secundary"}
    }),
    socialData2: await socialRepository.find({
      where: {type: "primary"}
    }),
  });
}