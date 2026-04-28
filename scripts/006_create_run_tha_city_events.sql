-- Create run_tha_city_events table
-- Stores community running events for Run Tha City 517

CREATE TABLE IF NOT EXISTS public.run_tha_city_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  start_time TIME,
  meeting_location TEXT NOT NULL,
  address TEXT,
  distance TEXT, -- e.g., "3 miles", "5K"
  difficulty TEXT DEFAULT 'All Levels' CHECK (difficulty IN ('All Levels', 'Beginner', 'Intermediate', 'Advanced')),
  route_description TEXT,
  special_notes TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.run_tha_city_events ENABLE ROW LEVEL SECURITY;

-- Public can view published events
CREATE POLICY "rtc_events_select_public" ON public.run_tha_city_events
  FOR SELECT USING (is_published = TRUE);

-- Admins can view all events
CREATE POLICY "rtc_events_select_admin" ON public.run_tha_city_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can insert events
CREATE POLICY "rtc_events_insert_admin" ON public.run_tha_city_events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can update events
CREATE POLICY "rtc_events_update_admin" ON public.run_tha_city_events
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can delete events
CREATE POLICY "rtc_events_delete_admin" ON public.run_tha_city_events
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_rtc_events_date ON public.run_tha_city_events(event_date);
CREATE INDEX IF NOT EXISTS idx_rtc_events_published ON public.run_tha_city_events(is_published, event_date);

-- Update timestamp trigger
CREATE TRIGGER rtc_events_updated_at
  BEFORE UPDATE ON public.run_tha_city_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
