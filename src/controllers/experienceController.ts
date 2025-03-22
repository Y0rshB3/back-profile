import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoExperience } from '../models/InfoExperience';

export async function getExperience(req: Request, res: Response): Promise<void> {
  const experienceRepository = AppDataSource.getRepository(InfoExperience);
  const language = req.query.language;
  const infoExperience = await experienceRepository.find({
    where: { language: language },
  });
  res.json(infoExperience);
}