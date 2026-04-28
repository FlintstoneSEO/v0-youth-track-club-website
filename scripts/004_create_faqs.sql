-- Create FAQs table
-- Stores frequently asked questions

CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General' CHECK (category IN ('General', 'Registration', 'Practices', 'Competitions', 'Programs', 'Equipment')),
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Public can view published FAQs
CREATE POLICY "faqs_select_public" ON public.faqs
  FOR SELECT USING (is_published = TRUE);

-- Admins can view all FAQs
CREATE POLICY "faqs_select_admin" ON public.faqs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can insert FAQs
CREATE POLICY "faqs_insert_admin" ON public.faqs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can update FAQs
CREATE POLICY "faqs_update_admin" ON public.faqs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admins can delete FAQs
CREATE POLICY "faqs_delete_admin" ON public.faqs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category, display_order);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON public.faqs(is_published, category);

-- Update timestamp trigger
CREATE TRIGGER faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
