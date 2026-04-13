/*
  # FLAMES Game Database Schema

  1. New Tables
    - `flames_games` - Stores FLAMES game results
      - `id` (uuid, primary key)
      - `player1_name` (text) - First player's name
      - `player2_name` (text) - Second player's name
      - `result` (text) - One of: Friends, Lovers, Acquaintances, Marriage, Enemies, Siblings
      - `created_at` (timestamp)
    
    - `flames_history` - Tracks game history for analytics
      - `id` (uuid, primary key)
      - `game_id` (uuid, foreign key)
      - `player1_length` (int) - Length of player 1 name
      - `player2_length` (int) - Length of player 2 name
      - `common_letters` (int) - Count of common letters
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `flames_games` table
    - All games are publicly viewable (no authentication required)
    - Enable RLS on `flames_history` table with appropriate policies
*/

CREATE TABLE IF NOT EXISTS flames_games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player1_name text NOT NULL,
  player2_name text NOT NULL,
  result text NOT NULL CHECK (result IN ('Friends', 'Lovers', 'Acquaintances', 'Marriage', 'Enemies', 'Siblings')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS flames_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid NOT NULL REFERENCES flames_games(id) ON DELETE CASCADE,
  player1_length int NOT NULL,
  player2_length int NOT NULL,
  common_letters int NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE flames_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE flames_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Games are publicly readable"
  ON flames_games
  FOR SELECT
  USING (true);

CREATE POLICY "Games are publicly insertable"
  ON flames_games
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "History is publicly readable"
  ON flames_history
  FOR SELECT
  USING (true);

CREATE POLICY "History is publicly insertable"
  ON flames_history
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_games_created_at ON flames_games(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_history_game_id ON flames_history(game_id);
