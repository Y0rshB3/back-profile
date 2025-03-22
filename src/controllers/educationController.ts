import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoEducation } from '../models/InfoEducation';

export async function getEducation(req: Request, res: Response): Promise<void> {
  const educationRepository = AppDataSource.getRepository(InfoEducation);
  const infoEducation = await educationRepository.find();
  res.json(infoEducation);
}