import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoDetailFromAbout } from '../models/InfoDetailFromAbout';

export async function getDetailFromAbout(req: Request, res: Response): Promise<void> {
  const detailFromAboutRepository = AppDataSource.getRepository(InfoDetailFromAbout);
  const infoDetailFromAbout = await detailFromAboutRepository.find();
  res.json(infoDetailFromAbout);
}