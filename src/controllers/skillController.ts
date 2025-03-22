import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoSkill } from '../models/InfoSkill';

export async function getSkill(req: Request, res: Response): Promise<void> {
  const skillRepository = AppDataSource.getRepository(InfoSkill);
  const language = req.query.language;
  const infoSkill = await skillRepository.find({
    where: { language: language },
    order: { order: 'ASC' },
  })
  res.json(infoSkill);
}