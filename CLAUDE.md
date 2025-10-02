# Backend Portfolio API - Context for Claude

## Project Overview
RESTful API backend for personal portfolio website built with Node.js, Express, TypeScript, and TypeORM with MySQL database. Includes real-time WebSocket support for deployment notifications and contact form email integration.

## Tech Stack
- **Runtime**: Node.js 20.x with TypeScript 5.3.3
- **Framework**: Express.js 4.18.2
- **ORM**: TypeORM 0.3.17
- **Database**: MySQL 8.0 (running in Docker container)
- **WebSocket**: Socket.IO 4.8.1
- **Email**: Nodemailer 7.0.6
- **Deployment**: Docker container on Raspberry Pi 4

## Infrastructure
- **Host**: Raspberry Pi 4 (192.168.1.254)
- **User**: y0rshb3
- **Public IP**: 186.115.118.183
- **Container**: backend (auto-restart enabled)
- **Port**: 4000
- **API Base URL**: http://localhost:4000/api/v1

## Database Configuration
- **Container Name**: mysql-db
- **Container IP**: 172.17.0.4
- **Port**: 3306
- **Database**: portfolio
- **User**: root
- **Remote User**: remote_user

### Environment Variables (.env)
```
portListen=4000
hostDatabase=172.17.0.4
userDatabase=root
passwordDatabase=***
database=portfolio
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@y0rshb3.com
SMTP_PASSWORD=***
```

**IMPORTANT**: The .env file is NOT in the repository. It's created automatically during deployment via GitHub Actions using GitHub Secrets.

## API Routes

### Info Routes (/api/v1/info)
All GET endpoints for portfolio data:
- `GET /home` - Welcome message and main info
- `GET /about` - About me information
- `GET /detailFromAbout` - Additional about details
- `GET /education` - Education history
- `GET /experience` - Work experience with technologies
- `GET /formContact` - Contact form configuration
- `GET /homeSkill` - Featured skills for home page
- `GET /skill` - All skills with categories
- `GET /portfolio` - Projects portfolio
- `GET /service` - Services offered
- `GET /social` - Social media links (with Font Awesome icons)

### Main Routes (/api/v1)
- `GET /resume` - Get complete resume data
- `POST /contact` - Submit contact form (sends email via Nodemailer)
- `POST /deploy-webhook` - GitHub Actions deployment webhook (triggers Socket.IO event)

## Key Files

### Core Application
- `src/app.ts` - Main application with Express, Socket.IO, and database initialization
- `src/routes.ts` - Main API routes (resume, contact)
- `src/routes.info.ts` - Info API routes (all portfolio data endpoints)
- `src/config/typeormConfig.ts` - TypeORM database configuration

### Controllers
- `src/controllers/contactController.ts` - Contact form with email sending
- `src/controllers/resumeController.ts` - Resume data aggregation
- `src/controllers/homeController.ts` - Home page info
- `src/controllers/aboutController.ts` - About page info
- `src/controllers/experienceController.ts` - Work experience
- `src/controllers/skillController.ts` - Skills with categories
- `src/controllers/portfolioController.ts` - Projects portfolio
- `src/controllers/socialController.ts` - Social links
- `src/controllers/educationController.ts` - Education history
- `src/controllers/serviceController.ts` - Services offered

### Models (TypeORM Entities)
- `src/models/contact.ts` - Contact form submissions
- `src/models/InfoHome.ts` - Home page content
- `src/models/InfoAbout.ts` - About information
- `src/models/InfoExperience.ts` - Work experience
- `src/models/InfoSkill.ts` - Skills with categories and levels
- `src/models/InfoPortfolio.ts` - Projects
- `src/models/InfoSocial.ts` - Social media links
- `src/models/InfoEducation.ts` - Education records
- `src/models/InfoService.ts` - Services
- `src/models/modules.ts` - Re-exports all models

## GitHub Actions CI/CD

### Repository
https://github.com/Y0rshB3/back-profile

### Workflow File
`.github/workflows/deploy.yml` - Auto-deploys on push to main branch

### Required GitHub Secrets
- `RASPBERRY_HOST`: Public IP
- `RASPBERRY_USER`: y0rshb3
- `RASPBERRY_SSH_KEY`: SSH private key for authentication
- `RASPBERRY_PORT`: 22
- `PORT`: 4000
- `DB_HOST`: 172.17.0.4
- `DB_USER`: root
- `DB_PASSWORD`: Database password
- `DB_NAME`: portfolio
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port (587 or 465)
- `SMTP_SECURE`: true for 465, false for 587
- `SMTP_USER`: contact@y0rshb3.com
- `SMTP_PASSWORD`: SMTP password or app password

### Deployment Process
1. SSH to Raspberry Pi using key authentication
2. Pull latest code from GitHub
3. Restore .env file with secrets
4. Run npm install
5. Restart backend Docker container
6. Health check: curl http://localhost:4000/api/v1/info/home

## Docker Commands
```bash
# View logs
docker logs backend

# Restart container
docker restart backend

# Check container status
docker ps | grep backend

# Access container shell
docker exec -it backend sh
```

## Development
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Start production
npm start
```

## WebSocket Features
- **Real-time deployment notifications** via Socket.IO
- Frontend connects to Socket.IO server on port 4000
- GitHub Actions sends webhook to `/api/v1/deploy-webhook`
- Backend emits 'deployment' event to all connected clients
- Used for showing deployment status in frontend notification component

## Email Integration
- **Contact form emails** sent via Nodemailer
- SMTP configuration in .env file
- Email template with user message
- Sends to configured SMTP_USER email address

## Important Notes
1. **Never commit .env file** - Contains sensitive credentials
2. **Always use GitHub Secrets** for deployment configuration
3. **Database password was removed from Git history** - Use secrets only
4. **Container has auto-restart** - Survives system reboots
5. **Health check endpoint**: /api/v1/info/home
6. **Socket.IO CORS** - Currently set to "*" for development, should be restricted in production
7. **TypeORM synchronize** - Should be false in production, use migrations instead

## Git Commit Guidelines
**CRITICAL**: All commits must follow these rules:
1. **NO Claude references** - Never include Claude attribution in commit messages:
   - ❌ Do NOT include: `🤖 Generated with [Claude Code]`
   - ❌ Do NOT include: `Co-Authored-By: Claude <noreply@anthropic.com>`
2. **Author must be**: Y0rshb3 <jebp91@hotmail.com>
3. **Commit message format**:
   ```
   Short descriptive title

   - Bullet point of changes
   - Another change
   - More details
   ```
4. **Use `git commit --amend`** only for:
   - Own commits (verify with `git log -1 --format='%an %ae'`)
   - Commits not yet pushed to remote
   - Adding pre-commit hook changes

## Common Issues
1. **502 Bad Gateway**: Check if backend container is running and .env is configured correctly
2. **Database connection failed**: Verify MySQL container IP and credentials
3. **Port already in use**: Another process might be using port 4000
4. **GitHub Actions SSH failure**: Verify RASPBERRY_SSH_KEY secret is correct (including BEGIN/END lines)

## Project Location
`/home/y0rshb3/devops/temp_backend`
