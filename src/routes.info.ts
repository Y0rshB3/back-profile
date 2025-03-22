require('dotenv').config();
import express from 'express';
import * as homeController from './controllers/homeController';
import * as aboutController from './controllers/aboutController';
import * as detailFromAboutController from './controllers/detailFromAboutController';
import * as educationController from './controllers/educationController';
import * as experienceController from './controllers/experienceController';
import * as formContactController from './controllers/formContactController';
import * as homeSkillController from './controllers/homeSkillController';
import * as skillController from './controllers/skillController';
import * as portfolioController from './controllers/portfolioController';
import * as serviceController from './controllers/serviceController';
import * as socialController from './controllers/socialController';

const routerInfo = express.Router();

routerInfo.get('/home', homeController.getHome);
routerInfo.get('/about', aboutController.getAbout);
routerInfo.get('/detailFromAbout', detailFromAboutController.getDetailFromAbout);
routerInfo.get('/education', educationController.getEducation);
routerInfo.get('/experience', experienceController.getExperience);
routerInfo.get('/formContact', formContactController.getFormContact);
routerInfo.get('/homeSkill', homeSkillController.getHomeSkill);
routerInfo.get('/skill', skillController.getSkill);
routerInfo.get('/portfolio', portfolioController.getPortfolio);
routerInfo.get('/service', serviceController.getService);
routerInfo.get('/social', socialController.getSocial);

export default routerInfo;