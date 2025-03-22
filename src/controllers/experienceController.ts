import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoExperience } from '../models/InfoExperience';

export async function getExperience(req: Request, res: Response): Promise<void> {
  const experienceRepository = AppDataSource.getRepository(InfoExperience);
  const infoExperience = await experienceRepository.find();
  res.json(infoExperience);
}