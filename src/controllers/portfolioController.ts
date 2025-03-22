import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoPortfolio } from '../models/InfoPortfolio';

export async function getPortfolio(req: Request, res: Response): Promise<void> {
  const portfolioRepository = AppDataSource.getRepository(InfoPortfolio);
  const infoPortfolio = await portfolioRepository.find();
  res.json(infoPortfolio);
}