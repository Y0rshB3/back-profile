import { Server, Socket } from 'socket.io';
import { generateResponse } from '../services/aiService';
import { buildContext } from '../services/contextBuilderService';
import { checkOffensiveContentCached } from '../services/moderationService';
import {
  findOrCreateUser,
  incrementUserStrikes,
  blockUser,
  isIPBlocked,
  saveMessage
} from '../services/chatUserService';

interface ChatSocketData {
  userId?: number;
  email?: string;
  name?: string;
  ipAddress?: string;
}

/**
 * Configura el namespace de Socket.IO para el chatbot
 */
export function setupChatbotSocket(io: Server): void {
  const chatbotNamespace = io.of('/chatbot');

  chatbotNamespace.on('connection', async (socket: Socket) => {
    console.log(`[Chatbot] Client connected: ${socket.id}`);

    // Obtener IP del cliente
    const ipAddress = socket.handshake.address || socket.handshake.headers['x-forwarded-for'] as string || 'unknown';
    (socket.data as ChatSocketData).ipAddress = ipAddress;

    // Verificar si la IP está bloqueada
    const ipBlocked = await isIPBlocked(ipAddress);
    if (ipBlocked) {
      socket.emit('chat_blocked', {
        message: 'Your IP has been blocked due to inappropriate language. Access denied.'
      });
      socket.disconnect(true);
      return;
    }

    // Evento: Autenticación del usuario
    socket.on('authenticate', async (data: { name: string; email: string }) => {
      try {
        const { name, email } = data;

        // Validar datos
        if (!name || !email) {
          socket.emit('auth_error', { message: 'Name and email are required' });
          return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          socket.emit('auth_error', { message: 'Invalid email format' });
          return;
        }

        // Crear o encontrar usuario
        const user = await findOrCreateUser(name, email, ipAddress);

        // Verificar si el usuario está bloqueado
        if (user.blocked) {
          socket.emit('chat_blocked', {
            message: 'You have been blocked due to inappropriate language.'
          });
          socket.disconnect(true);
          return;
        }

        // Guardar datos del usuario en el socket
        (socket.data as ChatSocketData).userId = user.id;
        (socket.data as ChatSocketData).email = user.email;
        (socket.data as ChatSocketData).name = user.name;

        // Confirmar autenticación
        socket.emit('authenticated', {
          userId: user.id,
          name: user.name,
          email: user.email
        });

        console.log(`[Chatbot] User authenticated: ${user.email} (ID: ${user.id})`);
      } catch (error) {
        console.error('[Chatbot] Authentication error:', error);
        socket.emit('auth_error', { message: 'Authentication failed' });
      }
    });

    // Evento: Mensaje del usuario
    socket.on('chat_message', async (data: { message: string; language?: string }) => {
      try {
        const { message, language = 'es' } = data;
        const socketData = socket.data as ChatSocketData;

        // Verificar autenticación
        if (!socketData.userId) {
          socket.emit('error', { message: 'Not authenticated. Please authenticate first.' });
          return;
        }

        // Validar mensaje
        if (!message || message.trim().length === 0) {
          socket.emit('error', { message: 'Message cannot be empty' });
          return;
        }

        if (message.length > 500) {
          socket.emit('error', { message: 'Message too long. Maximum 500 characters.' });
          return;
        }

        console.log(`[Chatbot] Message from ${socketData.email}: ${message}`);

        // Verificar contenido ofensivo usando IA
        const moderationResult = await checkOffensiveContentCached(message);
        if (moderationResult.isOffensive) {
          console.log(`[Chatbot] Offensive content detected from ${socketData.email}:`, moderationResult.reason, `(severity: ${moderationResult.severity})`);

          // Incrementar strikes
          const strikeCount = await incrementUserStrikes(socketData.userId);

          if (strikeCount >= 3) {
            // Bloquear usuario e IP
            await blockUser(
              socketData.userId,
              `Offensive language detected: ${moderationResult.reason}`
            );

            socket.emit('chat_blocked', {
              message: 'You have been permanently blocked for using inappropriate language.'
            });

            socket.disconnect(true);
            return;
          } else {
            // Enviar advertencia
            const warningMessages = {
              es: `Advertencia ${strikeCount}/3: Por favor evita el lenguaje ofensivo. Serás bloqueado después de 3 advertencias.`,
              en: `Warning ${strikeCount}/3: Please avoid offensive language. You will be blocked after 3 warnings.`,
              fr: `Avertissement ${strikeCount}/3: Veuillez éviter le langage offensant. Vous serez bloqué après 3 avertissements.`
            };

            socket.emit('chat_warning', {
              message: warningMessages[language as keyof typeof warningMessages] || warningMessages.es,
              strikeCount,
              maxStrikes: 3
            });

            return;
          }
        }

        // Construir contexto desde la base de datos
        const context = await buildContext(message, language);

        // Generar respuesta con IA
        const aiResponse = await generateResponse(message, context, language);

        // Guardar mensaje en la base de datos
        await saveMessage(socketData.userId, message, aiResponse, language);

        // Enviar respuesta al cliente
        socket.emit('chat_response', {
          message,
          response: aiResponse,
          timestamp: new Date()
        });

        console.log(`[Chatbot] Response sent to ${socketData.email}`);
      } catch (error) {
        console.error('[Chatbot] Error processing message:', error);

        const errorMessages = {
          es: 'Lo siento, ocurrió un error procesando tu mensaje. Por favor intenta de nuevo.',
          en: 'Sorry, an error occurred processing your message. Please try again.',
          fr: 'Désolé, une erreur s\'est produite lors du traitement de votre message. Veuillez réessayer.'
        };

        socket.emit('error', {
          message: errorMessages[data.language as keyof typeof errorMessages] || errorMessages.es
        });
      }
    });

    // Evento: Desconexión
    socket.on('disconnect', () => {
      const socketData = socket.data as ChatSocketData;
      console.log(`[Chatbot] Client disconnected: ${socket.id} (${socketData.email || 'not authenticated'})`);
    });
  });

  console.log('[Chatbot] Socket.IO namespace /chatbot configured');
}
