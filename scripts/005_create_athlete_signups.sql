-- Create athlete_signups table
-- Stores registration submissions from parents

CREATE TABLE IF NOT EXISTS public.athlete_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Athlete info
  athlete_first_name TEXT NOT NULL,
  athlete_last_name TEXT NOT NULL,
  athlete_age INTEGER NOT NULL CHECK (athlete_age >= 6 AND athlete_age <= 18),
  grade_level TEXT NOT NULL,
  -- Parent/Guardian info
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  -- Additional info
  experience_level TEXT DEFAULT 'none' CHECK (experience_level IN ('none', 'some', 'moderate', 'experienced')),
  events_interest TEXT,
  notes TEXT,
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'registered', 'declined', 'waitlist')),
  admin_notes TEXT,
  processed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.athlete_signups ENABLE ROW LEVEL SECURITY;

-- No public access to signups (privacy protection)

-- Admins can view all signups
CREATE POLICY "athlete_signups_select_admin" ON public.athlete_signups
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Anyone can submit a signup (no auth required)
CREATE POLICY "athlete_signups_insert_public" ON public.athlete_signups
  FOR INSERT WITH CHECK (TRUE);

-- Admins can update signups
CREATE POLICY "athlete_signups_update_admin" ON public.athlete_signups
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Super admins can delete signups
CREATE POLICY "athlete_signups_delete_admin" ON public.athlete_signups
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_athlete_signups_status ON public.athlete_signups(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_athlete_signups_email ON public.athlete_signups(parent_email);

-- Update timestamp trigger
CREATE TRIGGER athlete_signups_updated_at
  BEFORE UPDATE ON public.athlete_signups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
