export type FlamesResult = 'Friends' | 'Lovers' | 'Affection' | 'Marriage' | 'Enemy' | 'Soul Mates';

export interface FlamesGameData {
  player1Name: string;
  player2Name: string;
  result: FlamesResult;
  commonLetters: number;
  totalCount: number;
  originalCount: number;
  steps: number[];
}

const FLAMES_MEANINGS: Record<FlamesResult, { label: string; color: string; emoji: string }> = {
  Friends: { label: 'Friends', color: 'from-blue-400 to-blue-600', emoji: '👫' },
  Lovers: { label: 'Lovers', color: 'from-red-400 to-red-600', emoji: '💕' },
  Affection: { label: 'Affection', color: 'from-pink-400 to-pink-600', emoji: '💗' },
  Marriage: { label: 'Marriage', color: 'from-amber-400 to-amber-600', emoji: '💍' },
  'Enemy': { label: 'Enemy', color: 'from-orange-400 to-orange-600', emoji: '♾️' },
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

export const FLAMES_RESULTS: FlamesResult[] = ['Friends', 'Lovers', 'Affection', 'Marriage', 'Enemy', 'Soul Mates'];

export function calculateFLAMES(player1: string, player2: string, targetResult?: FlamesResult): FlamesGameData {
  if (!player1.trim() || !player2.trim()) {
    throw new Error('Both names are required');
  }

  const s1 = player1.toLowerCase().replace(/\s/g, '');
  const s2 = player2.toLowerCase().replace(/\s/g, '');

  const commonLetters = calculateCommonLetters(player1, player2);
  const naturalCount = s1.length + s2.length - 2 * commonLetters;
  let totalCount = naturalCount;

  // Helper to simulate FLAMES for a given count
  const simulate = (count: number): FlamesResult => {
    const arr = [...FLAMES_RESULTS];
    let idx = 0;
    while (arr.length > 1) {
      idx = (idx + count - 1) % arr.length;
      arr.splice(idx, 1);
      if (arr.length > 1) idx = idx % arr.length;
    }
    return arr[0];
  };

  // If a target result is requested, adjust the totalCount to hit it
  if (targetResult && FLAMES_RESULTS.includes(targetResult)) {
    let trialCount = totalCount || 1;
    let found = false;
    // Iterate to find a count that yields the target result
    for (let i = 0; i < 20; i++) {
      if (simulate(trialCount) === targetResult) {
        totalCount = trialCount;
        found = true;
        break;
      }
      trialCount++;
    }
    // If not found in simple sequence, find any count that works
    if (!found) {
      for (let i = 1; i <= 100; i++) {
        if (simulate(i) === targetResult) {
          totalCount = i;
          break;
        }
      }
    }
  }

  const flames = [...FLAMES_RESULTS];
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
    originalCount: naturalCount,
    steps,
  };
}
