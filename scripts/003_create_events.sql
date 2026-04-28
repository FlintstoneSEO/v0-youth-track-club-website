-- Create events table
-- Stores track meets, practices, and other events

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT DEFAULT 'Practice' CHECK (event_type IN ('Practice', 'Competition', 'Community', 'Social', 'Meeting')),
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location TEXT,
  address TEXT,
  registration_required BOOLEAN DEFAULT FALSE,
  registration_link TEXT,
  registration_deadline TIMESTAMPTZ,
  max_participants INTEGER,
  is_published BOOLEAN DEFAULT TRUE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public can view published events
CREATE POLICY "events_select_public" ON public.events
  FOR SELECT USING (is_published = TRUE);

-- Admins can view all events
CREATE POLICY "events_select_admin" ON public.events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can insert events
CREATE POLICY "events_insert_admin" ON public.events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can update events
CREATE POLICY "events_update_admin" ON public.events
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can delete events
CREATE POLICY "events_delete_admin" ON public.events
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date, start_time);
CREATE INDEX IF NOT EXISTS idx_events_type ON public.events(event_type, event_date);
CREATE INDEX IF NOT EXISTS idx_events_published ON public.events(is_published, event_date);

-- Update timestamp trigger
CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
