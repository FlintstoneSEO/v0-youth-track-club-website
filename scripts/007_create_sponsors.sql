-- Create sponsors table
-- Stores sponsor information for display on the website

CREATE TABLE IF NOT EXISTS public.sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('platinum', 'gold', 'silver', 'bronze', 'community')),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  start_date DATE,
  end_date DATE,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  notes TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

-- Public can view active sponsors (but not contact info)
CREATE POLICY "sponsors_select_public" ON public.sponsors
  FOR SELECT USING (is_active = TRUE);

-- Admins can view all sponsors
CREATE POLICY "sponsors_select_admin" ON public.sponsors
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can insert sponsors
CREATE POLICY "sponsors_insert_admin" ON public.sponsors
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can update sponsors
CREATE POLICY "sponsors_update_admin" ON public.sponsors
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can delete sponsors
CREATE POLICY "sponsors_delete_admin" ON public.sponsors
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_sponsors_tier ON public.sponsors(tier, display_order);
CREATE INDEX IF NOT EXISTS idx_sponsors_active ON public.sponsors(is_active, tier);

-- Update timestamp trigger
CREATE TRIGGER sponsors_updated_at
  BEFORE UPDATE ON public.sponsors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
