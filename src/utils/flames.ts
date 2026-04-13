export type FlamesResult = 'Friends' | 'Lovers' | 'Affection' | 'Marriage' | 'Eternal Bond' | 'Soul Mates';

export interface FlamesGameData {
  player1Name: string;
  player2Name: string;
  result: FlamesResult;
  commonLetters: number;
  totalCount: number;
  steps: number[];
}

const FLAMES_MEANINGS: Record<FlamesResult, { label: string; color: string; emoji: string }> = {
  Friends: { label: 'Friends', color: 'from-blue-400 to-blue-600', emoji: '👫' },
  Lovers: { label: 'Lovers', color: 'from-red-400 to-red-600', emoji: '💕' },
  Affection: { label: 'Affection', color: 'from-pink-400 to-pink-600', emoji: '💗' },
  Marriage: { label: 'Marriage', color: 'from-amber-400 to-amber-600', emoji: '💍' },
  'Eternal Bond': { label: 'Eternal Bond', color: 'from-orange-400 to-orange-600', emoji: '♾️' },
  'Soul Mates': { label: 'Soul Mates', color: 'from-purple-400 to-purple-600', emoji: '✨' },
};

export function getFlamesInfo(result: FlamesResult) {
  return FLAMES_MEANINGS[result];
}

export function calculateCommonLetters(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/\s/g, '');
  const s2 = str2.toLowerCase().replace(/\s/g, '');

  const freq1 = new Map<string, number>();
  const freq2 = new Map<string, number>();

  for (const char of s1) {
    freq1.set(char, (freq1.get(char) || 0) + 1);
  }

  for (const char of s2) {
    freq2.set(char, (freq2.get(char) || 0) + 1);
  }

  let commonCount = 0;
  for (const [char, count] of freq1) {
    if (freq2.has(char)) {
      commonCount += Math.min(count, freq2.get(char)!);
    }
  }

  return commonCount;
}

export function calculateFLAMES(player1: string, player2: string): FlamesGameData {
  if (!player1.trim() || !player2.trim()) {
    throw new Error('Both names are required');
  }

  const s1 = player1.toLowerCase().replace(/\s/g, '');
  const s2 = player2.toLowerCase().replace(/\s/g, '');

  const commonLetters = calculateCommonLetters(player1, player2);
  const totalCount = s1.length + s2.length - 2 * commonLetters;

  const flames = ['Friends', 'Lovers', 'Affection', 'Marriage', 'Eternal Bond', 'Soul Mates'] as FlamesResult[];
  let currentIndex = 0;
  const steps: number[] = [];

  while (flames.length > 1) {
    currentIndex = (currentIndex + totalCount - 1) % flames.length;
    steps.push(currentIndex);
    flames.splice(currentIndex, 1);
    if (flames.length > 1) {
      currentIndex = currentIndex % flames.length;
    }
  }

  return {
    player1Name: player1,
    player2Name: player2,
    result: flames[0],
    commonLetters,
    totalCount,
    steps,
  };
}
