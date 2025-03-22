import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeormConfig';
import { InfoFormContact } from '../models/InfoFormContact';

export async function getFormContact(req: Request, res: Response): Promise<void> {
  const formContactRepository = AppDataSource.getRepository(InfoFormContact);
  const infoFormContact = await formContactRepository.find();
  res.json(infoFormContact);
}