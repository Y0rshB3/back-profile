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
const Modules = require('../models/modules').Module;
const ChatUser = require('../models/ChatUser').ChatUser;
const ChatMessage = require('../models/ChatMessage').ChatMessage;
const BlockedIP = require('../models/BlockedIP').BlockedIP;
const PortfolioSummary = require('../models/PortfolioSummary').PortfolioSummary;
const Jorge = require('../models/Jorge').Jorge;

/* const tempDataSource = new DataSource({
  type: "mysql",
  host: process.env.hostDatabase,
  port: 3306,
  username: process.env.userDatabase,
  password: process.env.passwordDatabase,
});

async function ensureDatabaseExists() {
  if (!AppDataSource.isInitialized && !tempDataSource.isInitialized) {
    await tempDataSource.initialize();
    await tempDataSource.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.database}\`;`);
    await tempDataSource.destroy();
  }
} */

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
    Modules,
    ChatUser,
    ChatMessage,
    BlockedIP,
    PortfolioSummary,
    Jorge,
  ],
  synchronize: true,
});

/* async function initializeDatabase() {
  if (!AppDataSource.isInitialized) {
    await ensureDatabaseExists();
    await AppDataSource.initialize();
  }
}

initializeDatabase().catch((err) => console.error("Error DB:", err)); */

module.exports = {
  AppDataSource
};