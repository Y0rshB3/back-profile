import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoService } from '../models/InfoService';

export async function getService(req: Request, res: Response): Promise<void> {
  const serviceRepository = AppDataSource.getRepository(InfoService);
  const infoService = await serviceRepository.find();
  res.json(infoService);
}