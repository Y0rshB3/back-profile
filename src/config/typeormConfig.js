const { DataSource } = require('typeorm');
const Home = require('../models/InfoHome').InfoHome;
const About = require('../models/InfoAbout').InfoAbout;
const DetailFromAbout = require('../models/InfoDetailFromAbout').InfoDetailFromAbout;
const Education = require('../models/InfoEducation').InfoEducation;
const Experience = require('../models/InfoExperience').InfoExperience;
const FormContact = require('../models/InfoFormContact').InfoFormContact;
const HomeSkill = require('../models/InfoHomeSkill').InfoHomeSkill;
const Skill = require('../models/InfoSkill').InfoSkill;
const Portfolio = require('../models/InfoPortfolio').InfoPortfolio;
const Service = require('../models/InfoService').InfoService;
const Social = require('../models/InfoSocial').InfoSocial;
const Contact = require('../models/contact').Contact;

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.hostDatabase,
  port: 3306,
  username: process.env.userDatabase,
  password: process.env.passwordDatabase,
  database: process.env.database,
  entities: [
    Home,
    About,
    DetailFromAbout,
    Education,
    Experience,
    FormContact,
    HomeSkill,
    Skill,
    Portfolio,
    Service,
    Social,
    Contact,
  ],
  synchronize: false,
});

module.exports = {
  AppDataSource
};