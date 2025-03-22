require('dotenv').config();
import express from 'express';
import * as resumeController from './controllers/resumeController';
import * as contactController from './controllers/contactController';

const router = express.Router();

router.get('/resume', resumeController.getResume);
router.post('/contact', contactController.create);

export default router;