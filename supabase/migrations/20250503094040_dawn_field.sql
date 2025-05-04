/*
  # Create photos table

  1. New Tables
    - `photos`
      - `id` (uuid, primary key)
      - `filename` (text)
      - `file_size` (integer)
      - `file_type` (text)
      - `title` (text)
      - `category` (text)
      - `date` (timestamptz)
      - `url` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `photos` table
    - Add policy for authenticated users to read all photos
    - Add policy for authenticated users to insert their own photos
    - Add policy for authenticated users to update their own photos
    - Add policy for authenticated users to delete their own photos
*/

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  file_size integer NOT NULL,
  file_type text NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  date timestamptz NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Photos are viewable by everyone"
  ON photos
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own photos"
  ON photos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photos"
  ON photos
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own photos"
  ON photos
  FOR DELETE
  USING (auth.uid() = user_id);