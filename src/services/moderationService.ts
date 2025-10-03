import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

// Configuración de providers
const AI_PROVIDER = process.env.AI_PROVIDER || 'openai';

// Inicializar clientes
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const anthropicClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

/**
 * Prompt para moderación de contenido usando IA
 * Este prompt define qué se considera ofensivo
 */
const MODERATION_PROMPT = `Eres un moderador de contenido. Analiza el siguiente mensaje y determina si contiene contenido ofensivo.

**CONSIDERA OFENSIVO:**
- Insultos directos hacia personas (ej: "eres un idiota", "you are stupid")
- Amenazas de violencia o daño físico
- Lenguaje discriminatorio (racismo, sexismo, xenofobia, homofobia)
- Acusaciones difamatorias o calumnias graves
- Groserías extremadamente ofensivas dirigidas a alguien
- Acoso o intimidación

**NO CONSIDERES OFENSIVO:**
- Palabras casuales usadas sin intención de insultar
- Críticas constructivas o feedback
- Preguntas técnicas que contengan términos específicos
- Expresiones coloquiales sin contexto agresivo
- Frustración expresada sin dirigirse a nadie específicamente
- Palabras que en contexto no son ofensivas

Responde ÚNICAMENTE con un JSON válido en este formato exacto:
{
  "isOffensive": true o false,
  "reason": "breve explicación de por qué es o no ofensivo",
  "severity": "low", "medium", o "high" (solo si isOffensive es true)
}

NO agregues texto adicional, SOLO el JSON.`;

/**
 * Verifica si un mensaje contiene lenguaje ofensivo usando IA
 * @param message Mensaje a verificar
 * @returns { isOffensive: boolean, reason: string, severity?: string }
 */
export async function checkOffensiveContent(message: string): Promise<{
  isOffensive: boolean;
  reason: string;
  severity?: 'low' | 'medium' | 'high';
}> {
  try {
    let response: any;

    if (AI_PROVIDER === 'anthropic') {
      // Usar Anthropic Claude
      const anthropicResponse = await anthropicClient.messages.create({
        model: 'claude-3-haiku-20240307', // Modelo rápido y económico para moderación
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: `${MODERATION_PROMPT}\n\nMensaje a analizar: "${message}"`
          }
        ]
      });

      const content = anthropicResponse.content[0];
      if (content.type === 'text') {
        response = content.text;
      }
    } else {
      // Usar OpenAI (default)
      const openaiResponse = await openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo', // Modelo rápido y económico para moderación
        max_tokens: 200,
        temperature: 0, // Determinístico para moderación
        messages: [
          {
            role: 'system',
            content: MODERATION_PROMPT
          },
          {
            role: 'user',
            content: `Mensaje a analizar: "${message}"`
          }
        ]
      });

      response = openaiResponse.choices[0]?.message?.content || '';
    }

    // Parsear respuesta JSON
    const cleanedResponse = response.trim().replace(/```json\n?/g, '').replace(/```\n?/g, '');
    const result = JSON.parse(cleanedResponse);

    return {
      isOffensive: result.isOffensive || false,
      reason: result.reason || 'No reason provided',
      severity: result.severity
    };

  } catch (error) {
    console.error('Error en moderación de contenido:', error);

    // En caso de error, ser conservador y permitir el mensaje
    // pero loguearlo para revisión
    return {
      isOffensive: false,
      reason: 'Error en moderación - mensaje permitido por defecto'
    };
  }
}

/**
 * Verifica contenido ofensivo con caché simple para mensajes comunes
 * Esto reduce llamadas a la IA para mensajes repetidos
 */
const moderationCache = new Map<string, { isOffensive: boolean; reason: string; severity?: 'low' | 'medium' | 'high'; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hora

export async function checkOffensiveContentCached(message: string): Promise<{
  isOffensive: boolean;
  reason: string;
  severity?: 'low' | 'medium' | 'high';
}> {
  const cacheKey = message.toLowerCase().trim();
  const cached = moderationCache.get(cacheKey);

  // Verificar si existe en caché y no ha expirado
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    return {
      isOffensive: cached.isOffensive,
      reason: cached.reason,
      severity: cached.severity
    };
  }

  // No está en caché o expiró, consultar a la IA
  const result = await checkOffensiveContent(message);

  // Guardar en caché
  moderationCache.set(cacheKey, {
    ...result,
    timestamp: Date.now()
  });

  // Limpiar caché antigua (mantener solo últimos 1000 mensajes)
  if (moderationCache.size > 1000) {
    const entries = Array.from(moderationCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toDelete = entries.slice(0, entries.length - 1000);
    toDelete.forEach(([key]) => moderationCache.delete(key));
  }

  return result;
}

/**
 * Limpia el caché de moderación (útil para testing o mantenimiento)
 */
export function clearModerationCache(): void {
  moderationCache.clear();
}
