import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoHome } from '../models/InfoHome';

export async function getHome(req: Request, res: Response): Promise<void> {
  const homeRepository = AppDataSource.getRepository(InfoHome);
  const infoHome = await homeRepository.find();
  if (!res) {
    return infoHome;
  } else {
    res.json(infoHome);
  }
}