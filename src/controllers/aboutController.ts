import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoAbout } from '../models/InfoAbout';

export async function getAbout(req: Request, res: Response): Promise<void> {
  const aboutRepository = AppDataSource.getRepository(InfoAbout);
  const infoAbout = await aboutRepository.find();
  res.json(infoAbout);
}