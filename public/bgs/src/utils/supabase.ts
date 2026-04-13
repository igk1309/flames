import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface FlamesGameRecord {
  id: string;
  player1_name: string;
  player2_name: string;
  result: string;
  created_at: string;
}

export async function saveGame(
  player1Name: string,
  player2Name: string,
  result: string,
  commonLetters: number,
  totalCount: number
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('flames_games')
      .insert([{ player1_name: player1Name, player2_name: player2Name, result }])
      .select('id')
      .maybeSingle();

    if (error) {
      console.error('Error saving game:', error);
      return null;
    }

    if (data?.id) {
      await supabase.from('flames_history').insert([
        {
          game_id: data.id,
          player1_length: player1Name.length,
          player2_length: player2Name.length,
          common_letters: commonLetters,
        },
      ]);
    }

    return data?.id || null;
  } catch (error) {
    console.error('Error saving game:', error);
    return null;
  }
}

export async function getRecentGames(limit: number = 10): Promise<FlamesGameRecord[]> {
  try {
    const { data, error } = await supabase
      .from('flames_games')
      .select('id, player1_name, player2_name, result, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching games:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

export async function getGameStats() {
  try {
    const { data, error } = await supabase.from('flames_games').select('result');

    if (error) {
      console.error('Error fetching stats:', error);
      return {};
    }

    const stats: Record<string, number> = {};
    (data || []).forEach((game) => {
      stats[game.result] = (stats[game.result] || 0) + 1;
    });

    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {};
  }
}
