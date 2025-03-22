import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoSocial } from '../models/InfoSocial';

export async function getSocial(req: Request, res: Response): Promise<void> {
  const socialRepository = AppDataSource.getRepository(InfoSocial);
  const infoSocial = await socialRepository.find();
  res.json(infoSocial);
}