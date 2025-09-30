import { Request, Response } from 'express';
import axios from 'axios';
import { AppDataSource } from '../config/typeormConfig';
import { Contact } from '../models/contact';
import { EmailService } from '../services/emailService';

const emailService = new EmailService();

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    const { success, score } = response.data;
    
    // For reCAPTCHA v3, check if score is above threshold (0.5 is recommended)
    return success && score >= 0.5;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  // Verify reCAPTCHA token
  const { recaptchaToken } = req.body;
  
  if (!recaptchaToken) {
    res.status(400).json({ message: 'reCAPTCHA token is required' });
    return;
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);
  
  if (!isHuman) {
    res.status(400).json({ message: 'reCAPTCHA verification failed. Please try again.' });
    return;
  }

  if (paramsRequired(req.body) === false) {
    res.status(400).json({ message: 'Missing parameters' });
    return;
  }

  if (paramsNotEmpy(req.body).paramsEmpty) {
    res.status(400).json({ message: 'Empty parameters', params: paramsNotEmpy(req.body).paramsEmptyList });
    return;
  }

  if (validationValidEmail(req.body.email) === false) {
    res.status(400).json({ message: 'Invalid email' });
    return;
  }

  try {
    // Save to database
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = new Contact();
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.subject = req.body.subject;
    contact.message = req.body.message;
    const result = await contactRepository.save(contact);

    // Send email notification
    await emailService.sendContactEmail({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    res.json({ message: 'Contact created and email sent', id: result.id });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Error processing contact form', error: String(error) });
  }
}

const validationValidEmail = (email: string): boolean => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const paramsRequired = (params: any): boolean => {
  const required = ['name', 'email', 'subject', 'message'];
  for (const param of required) {
    if (params[param] === undefined) {
      return false;
    }
  }
  return true;
};

const paramsNotEmpy = (params: any) => {
  const required = ['name', 'email', 'subject', 'message'];
  const paramsEmpty = [];
  for (const param of required) {
    if (params[param] === '') {
      paramsEmpty.push(param);
    }
  }
  return {
    paramsEmpty: paramsEmpty.length > 0,
    paramsEmptyList: paramsEmpty
  };
};
