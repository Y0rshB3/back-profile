import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoSkill } from '../models/InfoSkill';

export async function getSkill(req: Request, res: Response): Promise<void> {
  const skillRepository = AppDataSource.getRepository(InfoSkill);
  const infoSkill = await skillRepository.find();
  res.json(infoSkill);
}