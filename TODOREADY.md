# Chatbot AI Implementation - Ready to Execute

## 🎯 Objetivo
Implementar un chatbot con IA (OpenAI GPT-4o-mini o Claude Haiku) que responda preguntas sobre Jorge y su portafolio, con moderación de contenido, bloqueo por IP, y persistencia de conversaciones.

---

## 📋 Plan de Implementación

### **Arquitectura Propuesta**

```
Frontend (Socket.IO Client)
    ↓ (emit: 'chat_message')
Backend (Socket.IO Server + Express)
    ↓
1. Validar usuario (nombre, email, IP)
2. Verificar si IP está bloqueada
3. Detectar lenguaje ofensivo
4. Buscar contexto en BD (resumen, experiencias, skills, proyectos)
5. Enviar a AI (OpenAI/Claude) con contexto
6. Guardar mensaje + respuesta en BD
7. Emitir respuesta al cliente
    ↓ (emit: 'chat_response')
Frontend (Mostrar respuesta)
```

---

## ✅ Tareas a Implementar

### **FASE 1: Base de Datos**
- [ ] **Tarea 1.1** - Crear entidad `ChatUser`
  - Campos: id, name, email, ipAddress, createdAt, blocked, strikeCount
  - Guardar nombre, email, IP del usuario
  - strikeCount: contador de insultos (0-3)
  - blocked: boolean para bloqueo permanente

- [ ] **Tarea 1.2** - Crear entidad `ChatMessage`
  - Campos: id, userId (FK), message, response, language, timestamp
  - Guardar pregunta del usuario + respuesta de la IA
  - language: "es" | "en" | "fr"

- [ ] **Tarea 1.3** - Crear entidad `BlockedIP`
  - Campos: id, ipAddress, reason, blockedAt, strikes
  - Registrar IPs bloqueadas con motivo
  - strikes: número de insultos antes del bloqueo

- [ ] **Tarea 1.4** - Crear entidad `PortfolioSummary`
  - Campos: id, section, content, language, updatedAt
  - Tabla de resumen optimizado para el chatbot
  - Secciones: "about", "skills_summary", "experience_summary", "projects_summary", "contact", "availability"
  - Ejemplo de contenido:
    ```
    section: "about"
    content: "Soy Jorge Becerra (y0rshb3), desarrollador Full Stack con X años de experiencia..."
    language: "es"
    ```

---

### **FASE 2: Servicios AI**
- [ ] **Tarea 2.1** - Instalar dependencias
  ```bash
  npm install openai @anthropic-ai/sdk bad-words-es
  ```
  - openai: Cliente oficial de OpenAI
  - @anthropic-ai/sdk: Cliente de Claude (Anthropic)
  - bad-words-es: Filtro de palabras ofensivas en español

- [ ] **Tarea 2.2** - Crear `src/services/aiService.ts`
  - Función `generateResponse(message, context, language)`
  - Usar OpenAI GPT-4o-mini (económico: $0.15/1M tokens input)
  - Alternativa: Claude Haiku ($0.25/1M tokens input)
  - Implementar el PROMPT SYSTEM exacto que proporcionaste
  - Manejo de errores y timeouts

- [ ] **Tarea 2.3** - Crear `src/services/contextBuilderService.ts`
  - Función `buildContext(query, language)`
  - Detectar qué información necesita la pregunta:
    - Si pregunta por skills → buscar en InfoSkill
    - Si pregunta por experiencia → buscar en InfoExperience
    - Si pregunta por proyectos → buscar en InfoPortfolio
    - Si pregunta general → buscar en PortfolioSummary
  - Limitar contexto a 2000 tokens para optimizar costos
  - Formato de contexto:
    ```
    CONTEXTO:
    === RESUMEN ===
    [Contenido de PortfolioSummary]

    === EXPERIENCIAS ===
    [Últimas 3 experiencias relevantes]

    === SKILLS ===
    [Skills filtrados por categoría]
    ```

- [ ] **Tarea 2.4** - Crear `src/services/moderationService.ts`
  - Función `checkOffensiveContent(message)`
  - Usar librería `bad-words-es` + lista custom
  - Lista de palabras prohibidas en ES/EN/FR
  - Retorna: { isOffensive: boolean, detectedWords: string[] }

---

### **FASE 3: WebSocket Chatbot**
- [ ] **Tarea 3.1** - Crear namespace de Socket.IO para chatbot
  - En `src/app.ts`, crear namespace: `/chatbot`
  ```typescript
  const chatbotNamespace = io.of('/chatbot');
  ```
  - Separar lógica del chatbot del WebSocket principal

- [ ] **Tarea 3.2** - Implementar autenticación de usuario en conexión
  - Al conectarse, cliente envía: `{ name, email }`
  - Validar formato de email
  - Obtener IP del socket: `socket.handshake.address`
  - Verificar si IP está bloqueada en BD
  - Si bloqueada → desconectar con error
  - Si no → crear/actualizar ChatUser

- [ ] **Tarea 3.3** - Implementar evento `chat_message`
  ```typescript
  socket.on('chat_message', async (data) => {
    // data: { message: string, language: string }
    // 1. Verificar moderación
    // 2. Si ofensivo → incrementar strikes
    // 3. Si strikes >= 3 → bloquear IP
    // 4. Buscar contexto en BD
    // 5. Llamar a AI
    // 6. Guardar mensaje + respuesta
    // 7. Emitir respuesta al cliente
  });
  ```

- [ ] **Tarea 3.4** - Implementar sistema de strikes
  - 1er insulto: Advertencia + incrementar strike
  - 2do insulto: Advertencia final + incrementar strike
  - 3er insulto: Bloquear IP + guardar en BlockedIP
  - Emitir eventos:
    - `chat_warning`: { message: "Advertencia 1/3" }
    - `chat_blocked`: { message: "IP bloqueada por lenguaje ofensivo" }

- [ ] **Tarea 3.5** - Implementar emisión de respuestas
  ```typescript
  socket.emit('chat_response', {
    message: userMessage,
    response: aiResponse,
    timestamp: new Date()
  });
  ```

---

### **FASE 4: API REST (Alternativa/Complemento)**
- [ ] **Tarea 4.1** - Crear ruta POST `/api/v1/chat/message`
  - Para clientes que no usen WebSocket
  - Body: { name, email, message, language }
  - Headers: capturar IP desde req.ip
  - Misma lógica de moderación + AI
  - Retornar: { response, warning?, blocked? }

- [ ] **Tarea 4.2** - Crear ruta GET `/api/v1/chat/history/:email`
  - Obtener historial de mensajes de un usuario
  - Paginación: ?page=1&limit=20
  - Solo últimos 50 mensajes

- [ ] **Tarea 4.3** - Crear ruta DELETE `/api/v1/chat/session/:email`
  - Limpiar historial de conversación
  - Útil para "reiniciar" chat

---

### **FASE 5: Configuración AI**
- [ ] **Tarea 5.1** - Agregar variables de entorno (.env)
  ```env
  # OpenAI
  OPENAI_API_KEY=sk-...
  OPENAI_MODEL=gpt-4o-mini

  # Anthropic (alternativa)
  ANTHROPIC_API_KEY=sk-ant-...
  ANTHROPIC_MODEL=claude-3-haiku-20240307

  # AI Provider (openai | anthropic)
  AI_PROVIDER=openai

  # Chatbot
  MAX_CONTEXT_TOKENS=2000
  MAX_RESPONSE_TOKENS=500
  ```

- [ ] **Tarea 5.2** - Crear archivo de configuración de prompts
  - `src/config/chatbotPrompts.ts`
  - System prompt exacto que proporcionaste
  - Configuración de tópicos permitidos
  - Variables dinámicas: {{ALLOWED_TOPICS}}

- [ ] **Tarea 5.3** - Implementar selección de provider
  - Switch entre OpenAI y Claude según .env
  - Interface común para ambos providers
  - Función `getAIProvider()` que retorna instancia configurada

---

### **FASE 6: Seeders y Data Inicial**
- [ ] **Tarea 6.1** - Crear seeder para `PortfolioSummary`
  - `src/seeds/portfolioSummarySeed.ts`
  - Contenido inicial en ES/EN/FR:
    - about: "Soy Jorge Becerra (y0rshb3), desarrollador Full Stack..."
    - skills_summary: "Domino JavaScript/TypeScript, React, Node.js, Python..."
    - experience_summary: "Tengo experiencia en desarrollo web, APIs RESTful..."
    - projects_summary: "He trabajado en proyectos como portfolio personal..."
    - contact: "Email: jebp91@hotmail.com, GitHub: Y0rshB3"
    - availability: "Disponible para proyectos freelance y oportunidades"

- [ ] **Tarea 6.2** - Ejecutar seeder
  - Script: `npm run seed:portfolio-summary`
  - Verificar datos en BD

---

### **FASE 7: Testing y Validación**
- [ ] **Tarea 7.1** - Probar detección de lenguaje ofensivo
  - Enviar mensajes con insultos
  - Verificar incremento de strikes
  - Verificar bloqueo en strike 3

- [ ] **Tarea 7.2** - Probar búsqueda de contexto
  - Pregunta: "¿Qué lenguajes dominas?"
  - Verificar que busque en InfoSkill
  - Pregunta: "¿Cuál es tu última experiencia?"
  - Verificar que busque en InfoExperience

- [ ] **Tarea 7.3** - Probar respuestas de AI
  - Preguntas dentro del dominio (portfolio)
  - Preguntas fuera del dominio (clima, noticias)
  - Verificar que responda: "No estoy autorizado..."

- [ ] **Tarea 7.4** - Probar WebSocket
  - Conectar cliente
  - Enviar mensajes
  - Recibir respuestas
  - Verificar strikes y bloqueos

---

### **FASE 8: Optimización y Seguridad**
- [ ] **Tarea 8.1** - Rate limiting por IP
  - 10 mensajes por minuto por IP
  - 100 mensajes por hora por IP

- [ ] **Tarea 8.2** - Cache de respuestas frecuentes
  - Si misma pregunta (hash) → retornar respuesta cacheada
  - Expira en 1 hora
  - Ahorra tokens de AI

- [ ] **Tarea 8.3** - Logging de conversaciones
  - Winston logger
  - Log de todas las preguntas/respuestas
  - Útil para análisis y debugging

- [ ] **Tarea 8.4** - Monitoreo de costos AI
  - Contador de tokens usados
  - Alertas si supera presupuesto
  - Dashboard de uso (opcional)

---

## 📁 Estructura de Archivos Nuevos

```
src/
├── controllers/
│   └── chatbotController.ts        # Controlador REST del chatbot
├── services/
│   ├── aiService.ts                # Integración OpenAI/Claude
│   ├── contextBuilderService.ts    # Construcción de contexto desde BD
│   ├── moderationService.ts        # Filtro de contenido ofensivo
│   └── chatUserService.ts          # Lógica de usuarios y bloqueos
├── models/
│   ├── ChatUser.ts                 # Entidad de usuarios del chat
│   ├── ChatMessage.ts              # Entidad de mensajes
│   ├── BlockedIP.ts                # Entidad de IPs bloqueadas
│   └── PortfolioSummary.ts         # Entidad de resumen para AI
├── config/
│   └── chatbotPrompts.ts           # Configuración de prompts
├── seeds/
│   └── portfolioSummarySeed.ts     # Seeder de resumen
├── sockets/
│   └── chatbotSocket.ts            # Lógica de WebSocket chatbot
└── routes.chatbot.ts               # Rutas REST del chatbot
```

---

## 💰 Estimación de Costos (AI)

### **OpenAI GPT-4o-mini** (Recomendado)
- Input: $0.150 / 1M tokens
- Output: $0.600 / 1M tokens
- **Ejemplo**: 1000 conversaciones/mes (promedio 500 tokens cada una)
  - Input: 500K tokens = $0.075
  - Output: 200K tokens = $0.120
  - **Total: ~$0.20/mes** ✅ MUY ECONÓMICO

### **Claude 3 Haiku** (Alternativa)
- Input: $0.25 / 1M tokens
- Output: $1.25 / 1M tokens
- **Ejemplo**: 1000 conversaciones/mes
  - Input: 500K tokens = $0.125
  - Output: 200K tokens = $0.250
  - **Total: ~$0.38/mes** ✅ ECONÓMICO

---

## 🔐 Seguridad Implementada

1. ✅ **Moderación de contenido** (bad-words-es + custom)
2. ✅ **Sistema de strikes** (3 strikes = bloqueo)
3. ✅ **Bloqueo por IP** (persistente en BD)
4. ✅ **Validación de email** (formato válido)
5. ✅ **Rate limiting** (anti-spam)
6. ✅ **Contexto limitado** (solo datos de portfolio)
7. ✅ **Prompt restrictivo** (no responde fuera de dominio)
8. ✅ **Sanitización de inputs** (prevención XSS)

---

## 🚀 Orden de Ejecución Recomendado

1. **Día 1**: FASE 1 (Base de Datos) - Crear todas las entidades
2. **Día 2**: FASE 2 (Servicios AI) - Integrar OpenAI/Claude
3. **Día 3**: FASE 3 (WebSocket) - Implementar lógica de chat
4. **Día 4**: FASE 6 (Seeders) - Cargar datos iniciales
5. **Día 5**: FASE 7 (Testing) - Probar todo el flujo
6. **Día 6**: FASE 4 (API REST) - Alternativa sin WebSocket
7. **Día 7**: FASE 8 (Optimización) - Cache, logs, seguridad

---

## 📝 Notas Importantes

- **Contexto dinámico**: El contexto se construye en tiempo real desde la BD
- **Multilenguaje**: Detectar idioma del usuario y responder en el mismo
- **Sin historial de chat en AI**: Cada mensaje es independiente (ahorra tokens)
- **Resumen optimizado**: PortfolioSummary es clave para respuestas rápidas
- **Fallback**: Si AI falla, responder con mensaje de error genérico

---

## ✅ Checklist de Completitud

- [ ] Base de datos creada (4 entidades)
- [ ] AI Service configurado (OpenAI o Claude)
- [ ] Moderación funcionando (detección de insultos)
- [ ] Bloqueo por IP implementado (3 strikes)
- [ ] WebSocket funcionando (namespace /chatbot)
- [ ] Contexto dinámico construido (búsqueda en BD)
- [ ] Seeder ejecutado (PortfolioSummary con datos)
- [ ] Testing completo (todas las pruebas pasadas)
- [ ] API REST implementada (alternativa)
- [ ] Rate limiting activo (anti-spam)
- [ ] Logs configurados (Winston)
- [ ] Variables de entorno documentadas (.env.example)

---

**¿Listo para empezar? Marca cada tarea con [x] cuando la completes.**
