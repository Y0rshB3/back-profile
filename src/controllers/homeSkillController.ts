import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoHomeSkill } from '../models/InfoHomeSkill';

export async function getHomeSkill(req: Request, res: Response): Promise<void> {
  const homeSkillRepository = AppDataSource.getRepository(InfoHomeSkill);
  const infoHomeSkill = await homeSkillRepository.find();
  res.json(infoHomeSkill);
}