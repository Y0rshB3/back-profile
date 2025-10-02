import { AppDataSource } from '../config/typeormConfig';
import { ChatUser } from '../models/ChatUser';
import { ChatMessage } from '../models/ChatMessage';
import { BlockedIP } from '../models/BlockedIP';

/**
 * Busca o crea un usuario del chat
 */
export async function findOrCreateUser(
  name: string,
  email: string,
  ipAddress: string
): Promise<ChatUser> {
  const userRepo = AppDataSource.getRepository(ChatUser);

  // Buscar usuario existente por email
  let user = await userRepo.findOne({ where: { email } });

  if (!user) {
    // Crear nuevo usuario
    user = userRepo.create({
      name,
      email,
      ipAddress,
      strikeCount: 0,
      blocked: false
    });
    await userRepo.save(user);
  } else {
    // Actualizar IP si cambió
    if (user.ipAddress !== ipAddress) {
      user.ipAddress = ipAddress;
      await userRepo.save(user);
    }
  }

  return user;
}

/**
 * Incrementa el contador de strikes del usuario
 */
export async function incrementUserStrikes(userId: number): Promise<number> {
  const userRepo = AppDataSource.getRepository(ChatUser);
  const user = await userRepo.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  user.strikeCount += 1;

  // Si llega a 3 strikes, bloquear usuario
  if (user.strikeCount >= 3) {
    user.blocked = true;
  }

  await userRepo.save(user);
  return user.strikeCount;
}

/**
 * Bloquea un usuario y su IP
 */
export async function blockUser(userId: number, reason: string): Promise<void> {
  const userRepo = AppDataSource.getRepository(ChatUser);
  const blockedIPRepo = AppDataSource.getRepository(BlockedIP);

  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }

  // Marcar usuario como bloqueado
  user.blocked = true;
  await userRepo.save(user);

  // Agregar IP a lista de bloqueados
  const existingBlock = await blockedIPRepo.findOne({
    where: { ipAddress: user.ipAddress }
  });

  if (!existingBlock) {
    const blockedIP = blockedIPRepo.create({
      ipAddress: user.ipAddress,
      reason,
      strikes: user.strikeCount
    });
    await blockedIPRepo.save(blockedIP);
  }
}

/**
 * Verifica si una IP está bloqueada
 */
export async function isIPBlocked(ipAddress: string): Promise<boolean> {
  const blockedIPRepo = AppDataSource.getRepository(BlockedIP);
  const blocked = await blockedIPRepo.findOne({ where: { ipAddress } });
  return !!blocked;
}

/**
 * Verifica si un usuario está bloqueado
 */
export async function isUserBlocked(email: string): Promise<boolean> {
  const userRepo = AppDataSource.getRepository(ChatUser);
  const user = await userRepo.findOne({ where: { email } });
  return user?.blocked || false;
}

/**
 * Guarda un mensaje en el historial
 */
export async function saveMessage(
  userId: number,
  message: string,
  response: string,
  language: string
): Promise<ChatMessage> {
  const messageRepo = AppDataSource.getRepository(ChatMessage);

  const chatMessage = messageRepo.create({
    userId,
    message,
    response,
    language: language as any
  });

  return await messageRepo.save(chatMessage);
}

/**
 * Obtiene el historial de mensajes de un usuario
 */
export async function getUserMessages(
  email: string,
  limit: number = 50
): Promise<ChatMessage[]> {
  const userRepo = AppDataSource.getRepository(ChatUser);
  const messageRepo = AppDataSource.getRepository(ChatMessage);

  const user = await userRepo.findOne({ where: { email } });
  if (!user) {
    return [];
  }

  return await messageRepo.find({
    where: { userId: user.id },
    order: { timestamp: 'DESC' },
    take: limit
  });
}

/**
 * Elimina el historial de mensajes de un usuario
 */
export async function clearUserMessages(email: string): Promise<void> {
  const userRepo = AppDataSource.getRepository(ChatUser);
  const messageRepo = AppDataSource.getRepository(ChatMessage);

  const user = await userRepo.findOne({ where: { email } });
  if (!user) {
    return;
  }

  await messageRepo.delete({ userId: user.id });
}
