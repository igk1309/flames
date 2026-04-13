/*
  # Create Couples Table for FLAMES App

  1. New Tables
    - `couples`
      - `id` (uuid, primary key)
      - `couple_name` (text, unique, indexed)
      - `male_name` (text)
      - `female_name` (text)
      - `male_image_path` (text)
      - `female_image_path` (text)
      - `caricature_image_path` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `couples` table
    - Add policy for public read access to all couples data

  3. Storage
    - Storage bucket `couple_images` for storing male, female, and caricature images
    - Images stored as: couple_name_male.jpg, couple_name_female.jpg, couple_name_caricature.jpg
*/

CREATE TABLE IF NOT EXISTS couples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_name text UNIQUE NOT NULL,
  male_name text NOT NULL,
  female_name text NOT NULL,
  male_image_path text NOT NULL,
  female_image_path text NOT NULL,
  caricature_image_path text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE couples ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read couples data"
  ON couples
  FOR SELECT
  TO anon, authenticated
  USING (true);
