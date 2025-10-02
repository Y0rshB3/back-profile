# Backend Portfolio API - TODO List

## 🤖 AI Features
- [ ] **AI Blog Post Generator Job**
  - Scheduled job (cron) to generate tech articles
  - Use AI API (OpenAI GPT-4, Anthropic Claude, or similar)
  - Topics: Recent tech news, trending technologies, tutorials, industry updates
  - Auto-publish or save as drafts for review
  - Generate SEO metadata (title, description, keywords)
  - Add sources/references/citations
  - Store in InfoPortfolio or new Blog table
  - Configuration:
    - Frequency (daily, weekly, etc.)
    - Article length
    - Tech stack preferences
    - Target audience level

- [ ] **Personal Chatbot API**
  - Endpoint: `POST /api/v1/chatbot` or WebSocket integration
  - Train on portfolio data (projects, experience, skills)
  - Answer questions about Jorge's background
  - Source data ONLY from database (no hallucinations)
  - Use RAG (Retrieval Augmented Generation) architecture
  - Vector database integration (Pinecone, Weaviate, or Qdrant)
  - LangChain or LlamaIndex framework
  - Multilingual support (EN/ES/FR)
  - Rate limiting per IP/session
  - Context management for conversations
  - Possible endpoints:
    - `POST /api/v1/chat/message` - Send message, get response
    - `GET /api/v1/chat/context` - Get current conversation context
    - `DELETE /api/v1/chat/session` - Clear conversation history
  - Security:
    - Input sanitization
    - Content filtering
    - Token usage limits

## 📊 SEO & Analytics
- [ ] **Blog Post SEO Metadata**
  - Add SEO fields to Blog/Portfolio model:
    - metaTitle
    - metaDescription
    - metaKeywords
    - canonicalUrl
    - ogImage (Open Graph image URL)
    - ogTitle, ogDescription
  - Generate sitemap.xml endpoint
  - Add robots.txt configuration
  - Schema.org structured data for blog posts

- [ ] **Analytics Integration**
  - Track API usage metrics
  - Log popular endpoints
  - Monitor response times
  - Track easter egg discoveries (if frontend sends events)
  - Store analytics in database or send to external service

## 🔐 Security Improvements
- [ ] **Rate Limiting**
  - Implement express-rate-limit
  - Contact form: 5 requests per hour per IP
  - API endpoints: 100 requests per 15 minutes
  - Chatbot: 20 messages per hour per session

- [ ] **Input Validation & Sanitization**
  - Add express-validator
  - Validate all POST/PUT request bodies
  - Sanitize HTML inputs
  - Email format validation
  - XSS prevention

- [ ] **CORS Configuration**
  - Restrict Socket.IO CORS from "*" to specific domains
  - Add allowed origins to .env configuration
  - Different CORS policies for dev/prod

- [ ] **Security Headers**
  - Install helmet.js
  - Configure CSP (Content Security Policy)
  - Add HSTS headers
  - X-Frame-Options, X-Content-Type-Options

- [ ] **Authentication & Authorization** (if needed)
  - JWT authentication for admin panel
  - Protected routes for CRUD operations
  - Role-based access control (admin, editor, viewer)

## 📝 Content Management
- [ ] **Blog/Article System**
  - Create Blog entity model
  - CRUD endpoints for blog posts
  - Categories and tags
  - Draft/Published status
  - View count tracking
  - Featured posts
  - Markdown content support
  - Search functionality

- [ ] **Admin Panel API**
  - CRUD operations for all entities
  - Bulk operations (bulk delete, bulk update)
  - Image upload endpoint
  - File management
  - Content preview before publish

## 🗄️ Database & Performance
- [ ] **Database Migrations**
  - Create TypeORM migrations instead of synchronize: true
  - Version control for database schema
  - Safer production deployments
  - Rollback capability

- [ ] **Database Optimization**
  - Add indexes to frequently queried fields
  - Optimize N+1 queries with eager loading
  - Query performance monitoring
  - Database connection pooling configuration

- [ ] **Caching Layer**
  - Redis integration for caching
  - Cache frequently accessed data (skills, projects, about)
  - Cache invalidation strategy
  - Response caching with ETags

- [ ] **API Response Optimization**
  - Pagination for list endpoints
  - Field selection (only return requested fields)
  - Data compression (gzip)
  - Response time monitoring

## 🧪 Testing
- [ ] **Unit Tests**
  - Jest + ts-jest setup
  - Test all controllers
  - Test all services
  - Mock database connections
  - Test email sending
  - Target: 80%+ code coverage

- [ ] **Integration Tests**
  - Test API endpoints end-to-end
  - Test database operations
  - Test WebSocket connections
  - Test file uploads

- [ ] **Load Testing**
  - Artillery or k6 for load testing
  - Simulate high traffic scenarios
  - Identify bottlenecks
  - Performance benchmarks

## 📱 API Features
- [ ] **File Upload System**
  - Multer integration
  - Image upload for projects/blog posts
  - File size limits
  - Image optimization (sharp library)
  - Store in /uploads or cloud storage (S3, Cloudinary)

- [ ] **Resume PDF Generation**
  - Generate PDF from database data
  - Puppeteer or PDFKit
  - Endpoint: `GET /api/v1/resume/download`
  - Different templates
  - Multilingual PDFs

- [ ] **Search API**
  - Full-text search across projects, skills, blog posts
  - ElasticSearch integration or simple SQL LIKE queries
  - Endpoint: `GET /api/v1/search?q=query`
  - Search suggestions/autocomplete

- [ ] **Contact Form Enhancements**
  - reCAPTCHA v3 verification server-side
  - Email confirmation to sender
  - Store submissions in database
  - Admin notification preferences
  - Attachment support

## 🔄 CI/CD & DevOps
- [ ] **Docker Optimization**
  - Multi-stage Docker build
  - Reduce image size
  - Use .dockerignore
  - Health check in Dockerfile

- [ ] **Environment Configuration**
  - Separate configs for dev/staging/prod
  - Config validation on startup
  - Better error messages for missing env vars

- [ ] **Logging System**
  - Winston or Pino for structured logging
  - Log levels (error, warn, info, debug)
  - Log rotation
  - Send errors to monitoring service (Sentry, LogRocket)

- [ ] **Monitoring & Alerts**
  - Health check endpoint improvements
  - Uptime monitoring (UptimeRobot, Pingdom)
  - Error tracking (Sentry)
  - Performance monitoring (New Relic, DataDog)

## 📚 Documentation
- [ ] **API Documentation**
  - Swagger/OpenAPI spec
  - Auto-generated docs
  - Interactive API explorer
  - Example requests/responses

- [ ] **Code Documentation**
  - JSDoc comments for all functions
  - TypeDoc for generating HTML docs
  - Architecture decision records (ADRs)

## 🔧 Code Quality
- [ ] **Linting & Formatting**
  - ESLint configuration
  - Prettier setup
  - Pre-commit hooks (Husky)
  - Consistent code style

- [ ] **TypeScript Improvements**
  - Strict mode enabled
  - Remove any types
  - Better type definitions
  - Generic types for reusable code

- [ ] **Dependency Updates**
  - Update all dependencies to latest stable
  - Security audit (npm audit)
  - Remove unused dependencies

## 🎯 Priority Tasks

### High Priority
1. AI Blog Post Generator Job (main feature request)
2. Personal Chatbot API (main feature request)
3. Blog Post SEO metadata
4. Rate limiting and security

### Medium Priority
5. Database migrations
6. Admin Panel API
7. Testing (unit + integration)
8. API documentation (Swagger)

### Low Priority
9. Caching layer
10. Load testing
11. Monitoring & alerts

---

## Notes
- All new endpoints should follow RESTful conventions
- Maintain TypeORM pattern for database operations
- Keep security as top priority for all features
- AI features should have configurable costs/limits
- All new features should be documented

## Future Ideas
- [ ] GraphQL API alternative to REST
- [ ] Microservices architecture (separate blog service, chatbot service)
- [ ] Message queue (RabbitMQ, Redis Queue) for background jobs
- [ ] Multi-tenant support (multiple portfolios on same backend)
- [ ] Internationalization for database content (not just frontend)
- [ ] Webhook system for external integrations
- [ ] OAuth integration (GitHub, LinkedIn login for comments)
- [ ] Newsletter subscription system
