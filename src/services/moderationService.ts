import Filter from 'bad-words-es';

// Inicializar filtro de palabras ofensivas
const filter = new Filter();

// Lista personalizada adicional (puedes agregar más palabras)
const customBadWords = [
  // Agregar palabras específicas que quieras bloquear
  'idiota',
  'estúpido',
  'tonto',
  'imbécil',
  'pendejo',
  'idiots',
  'stupid',
  'dumb',
  'moron',
  'idiot',
  'connard',
  'crétin',
  'imbécile',
];

// Agregar palabras custom al filtro
customBadWords.forEach(word => {
  filter.addWords(word);
});

/**
 * Verifica si un mensaje contiene lenguaje ofensivo
 * @param message Mensaje a verificar
 * @returns { isOffensive: boolean, detectedWords: string[] }
 */
export function checkOffensiveContent(message: string): {
  isOffensive: boolean;
  detectedWords: string[];
} {
  const lowerMessage = message.toLowerCase();
  const detectedWords: string[] = [];

  // Verificar con bad-words-es
  if (filter.isProfane(message)) {
    // Encontrar qué palabras específicas fueron detectadas
    const words = lowerMessage.split(/\s+/);
    words.forEach(word => {
      // Limpiar puntuación
      const cleanWord = word.replace(/[^\w\sáéíóúñü]/gi, '');
      if (filter.isProfane(cleanWord)) {
        detectedWords.push(cleanWord);
      }
    });

    return {
      isOffensive: true,
      detectedWords: [...new Set(detectedWords)] // Eliminar duplicados
    };
  }

  return {
    isOffensive: false,
    detectedWords: []
  };
}

/**
 * Limpia el mensaje de palabras ofensivas (opcional)
 * @param message Mensaje a limpiar
 * @returns Mensaje limpio con asteriscos
 */
export function cleanOffensiveContent(message: string): string {
  return filter.clean(message);
}

/**
 * Agrega una palabra a la lista de bloqueadas
 * @param word Palabra a bloquear
 */
export function addBadWord(word: string): void {
  filter.addWords(word);
}

/**
 * Remueve una palabra de la lista de bloqueadas
 * @param word Palabra a desbloquear
 */
export function removeBadWord(word: string): void {
  filter.removeWords(word);
}
