require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { AppDataSource } from './config/typeormConfig';
import apiRouter from './routes';
import apiRouterInfo from './routes.info';
import { setupChatbotSocket } from './sockets/chatbotSocket';

const app = express();
const httpServer = createServer(app);

// Socket.IO setup with CORS
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Global io instance for use in routes
global.io = io;

AppDataSource.initialize().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});

app.use(cors());
app.use(express.json());

// Socket.IO connection handler (deployment notifications)
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Setup chatbot namespace
setupChatbotSocket(io);

// Webhook endpoint for GitHub Actions
app.post('/api/v1/deploy-webhook', (req, res) => {
  const { status, repository } = req.body;
  console.log(`Deploy webhook received: ${repository} - ${status}`);
  
  // Emit to all connected clients
  io.emit('deployment', { status, repository, timestamp: new Date() });
  
  res.json({ message: 'Webhook received' });
});

app.use('/api/v1/info', apiRouterInfo);
app.use('/api/v1', apiRouter);

const PORT = Number(process.env.portListen) || 4000;
httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`WebSocket server running`);
});
