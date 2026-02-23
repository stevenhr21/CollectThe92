-- Leagues feature: run this in the Supabase SQL Editor

CREATE TABLE leagues (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  code        TEXT NOT NULL UNIQUE,
  created_by  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE league_members (
  league_id    UUID NOT NULL REFERENCES leagues(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  joined_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (league_id, user_id)
);

CREATE INDEX idx_league_members_user ON league_members(user_id);
CREATE INDEX idx_leagues_code ON leagues(code);

-- Enable Row Level Security
ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE league_members ENABLE ROW LEVEL SECURITY;

-- Leagues policies
CREATE POLICY "Authenticated users can create leagues"
  ON leagues FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Members can view their leagues"
  ON leagues FOR SELECT
  TO authenticated
  USING (
    id IN (SELECT league_id FROM league_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Creator can delete their league"
  ON leagues FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- League members policies
CREATE POLICY "Members can view fellow members"
  ON league_members FOR SELECT
  TO authenticated
  USING (
    league_id IN (SELECT league_id FROM league_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Authenticated users can join leagues"
  ON league_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Members can leave leagues"
  ON league_members FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
