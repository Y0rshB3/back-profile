/**
 * Servicio de moderación de contenido
 * Detecta insultos directos, difamaciones y groserías graves
 */

// Insultos que se consideran ofensivos cuando se usan de forma directa (eres un..., you are a...)
const directInsults = [
  // Español
  'idiota', 'estúpido', 'estupido', 'tonto', 'imbécil', 'imbecil', 'pendejo', 'cabrón', 'cabron',
  'marica', 'maricon', 'maricón', 'puto', 'puta', 'hijo de puta', 'hijueputa', 'malparido',
  'gonorrea', 'desgraciado', 'mierda', 'imbécil', 'gilipollas', 'mamón', 'mamaguevo',

  // Inglés
  'idiot', 'stupid', 'dumb', 'moron', 'fool', 'bastard', 'asshole', 'bitch', 'motherfucker',
  'dickhead', 'cunt', 'retard', 'loser', 'piece of shit',

  // Francés
  'connard', 'crétin', 'cretin', 'imbécile', 'imbecile', 'salaud', 'enculé', 'encule',
  'putain', 'merde', 'con'
];

// Patrones de insultos directos que incluyen el contexto
const directInsultPatterns = [
  // Español
  /\b(eres|sos|es)\s+(un|una|el|la)?\s*(idiota|estúpido|estupido|tonto|imbécil|imbecil|pendejo|cabrón|cabron|marica|maricón|maricon|puto|puta|desgraciado|gilipollas|mamón|mamaguevo)\b/gi,
  /\b(vete|andate|vaya)\s+(a|al)\s+(la\s+)?(mierda|carajo|verga|chingada)\b/gi,
  /\bhijo\s+de\s+puta\b/gi,
  /\bhijueputa\b/gi,
  /\bmalparido\b/gi,
  /\bme\s+cago\s+en\b/gi,
  /\bvale\s+verga\b/gi,

  // Inglés
  /\b(you|you're|you are|he|she|he's|she's|he is|she is)\s+(a|an)?\s*(idiot|stupid|dumb|moron|fool|bastard|asshole|bitch|motherfucker|dickhead|cunt|retard|loser|piece of shit)\b/gi,
  /\bfuck\s+you\b/gi,
  /\bgo\s+to\s+hell\b/gi,
  /\bshut\s+up\b/gi,

  // Francés
  /\b(tu|tu es|vous|vous êtes|vous etes)\s+(un|une)?\s*(connard|crétin|cretin|imbécile|imbecile|salaud|enculé|encule|con)\b/gi,
  /\bva\s+te\s+faire\s+foutre\b/gi,
  /\bferme\s+ta\s+gueule\b/gi
];

// Groserías extremadamente ofensivas que siempre se bloquean
const extremelyOffensiveWords = [
  // Racismo, sexismo, xenofobia
  /\bn[i1]gg[ae3]r\b/gi,
  /\bn[i1]gg[ae3]\b/gi,
  /\bfaggot\b/gi,
  /\btranny\b/gi,
  /\bspic\b/gi,
  /\bchink\b/gi,

  // Amenazas
  /\b(te\s+voy\s+a|i\s+will|i'm\s+gonna|i\s+am\s+going\s+to)\s+(matar|kill|hurt|golpear|pegar)\b/gi,
  /\bkill\s+yourself\b/gi,
  /\bsuicidate\b/gi,
  /\bmuérete\b/gi,
  /\bmuerte\b/gi
];

/**
 * Verifica si un mensaje contiene lenguaje ofensivo
 * Solo detecta:
 * 1. Insultos directos con contexto (eres un idiota, you are stupid)
 * 2. Groserías extremadamente ofensivas
 * 3. Amenazas
 *
 * @param message Mensaje a verificar
 * @returns { isOffensive: boolean, detectedWords: string[], reason: string }
 */
export function checkOffensiveContent(message: string): {
  isOffensive: boolean;
  detectedWords: string[];
  reason?: string;
} {
  const detectedWords: string[] = [];
  let reason = '';

  // 1. Verificar groserías extremas (racismo, amenazas, etc.)
  for (const pattern of extremelyOffensiveWords) {
    const matches = message.match(pattern);
    if (matches) {
      detectedWords.push(...matches);
      reason = 'Contenido extremadamente ofensivo detectado';
      return {
        isOffensive: true,
        detectedWords: Array.from(new Set(detectedWords)),
        reason
      };
    }
  }

  // 2. Verificar insultos directos con contexto
  for (const pattern of directInsultPatterns) {
    const matches = message.match(pattern);
    if (matches) {
      detectedWords.push(...matches);
      reason = 'Insulto directo detectado';
    }
  }

  // Si se encontraron insultos directos
  if (detectedWords.length > 0) {
    return {
      isOffensive: true,
      detectedWords: Array.from(new Set(detectedWords)),
      reason
    };
  }

  // El mensaje es apropiado
  return {
    isOffensive: false,
    detectedWords: []
  };
}

/**
 * Limpia el mensaje de palabras ofensivas (reemplaza con asteriscos)
 * @param message Mensaje a limpiar
 * @returns Mensaje limpio
 */
export function cleanOffensiveContent(message: string): string {
  let cleanedMessage = message;

  // Limpiar insultos directos
  for (const pattern of directInsultPatterns) {
    cleanedMessage = cleanedMessage.replace(pattern, (match) => '*'.repeat(match.length));
  }

  // Limpiar groserías extremas
  for (const pattern of extremelyOffensiveWords) {
    cleanedMessage = cleanedMessage.replace(pattern, (match) => '*'.repeat(match.length));
  }

  return cleanedMessage;
}

/**
 * Agrega un patrón de insulto directo personalizado
 * @param pattern Patrón regex o string
 */
export function addOffensivePattern(pattern: RegExp | string): void {
  if (typeof pattern === 'string') {
    directInsultPatterns.push(new RegExp(`\\b${pattern}\\b`, 'gi'));
  } else {
    directInsultPatterns.push(pattern);
  }
}

/**
 * Agrega una palabra a la lista de insultos directos
 * @param word Palabra a bloquear
 */
export function addDirectInsult(word: string): void {
  directInsults.push(word.toLowerCase());
}
