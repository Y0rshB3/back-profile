# Backend Portfolio API - Context for Claude

## Project Overview
RESTful API backend for personal portfolio website built with Node.js, Express, TypeScript, and TypeORM with MySQL database.

## Tech Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **ORM**: TypeORM
- **Database**: MySQL 8.0 (running in Docker container)
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
- Various endpoints for portfolio data (home, about, skills, services, education, experience, portfolio, socials)

### Main Routes (/api/v1)
- `GET /resume` - Get resume data
- `POST /contact` - Create contact form submission

## Key Files
- `src/app.ts` - Main application entry point
- `src/routes.ts` - Main API routes (resume, contact)
- `src/routes.info.ts` - Info API routes (portfolio data)
- `src/config/typeormConfig.ts` - Database configuration
- `src/controllers/contactController.ts` - Contact form controller
- `src/controllers/resumeController.ts` - Resume data controller
- `src/models/contact.ts` - Contact entity model

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

## Important Notes
1. **Never commit .env file** - Contains sensitive credentials
2. **Always use GitHub Secrets** for deployment configuration
3. **Database password was removed from Git history** - Use secrets only
4. **Container has auto-restart** - Survives system reboots
5. **Health check endpoint**: /api/v1/info/home

## Common Issues
1. **502 Bad Gateway**: Check if backend container is running and .env is configured correctly
2. **Database connection failed**: Verify MySQL container IP and credentials
3. **Port already in use**: Another process might be using port 4000
4. **GitHub Actions SSH failure**: Verify RASPBERRY_SSH_KEY secret is correct (including BEGIN/END lines)

## Project Location
`/home/y0rshb3/devops/temp_backend`
