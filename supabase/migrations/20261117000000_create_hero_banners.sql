-- SARVONAYA Homepage Hero Banners Schema & RLS Policies
-- Completely controls the homepage hero banner ("Learn Anytime, Anywhere") dynamically

CREATE TABLE IF NOT EXISTS public.banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT,
    mobile_image_url TEXT,
    button_text TEXT DEFAULT 'Explore Courses',
    button_link TEXT DEFAULT '/courses',
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for ordering active banners
CREATE INDEX IF NOT EXISTS idx_hero_banners_active_order ON public.banners (is_active, display_order);

-- Enable Row Level Security (RLS)
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policy: Allow anyone (students & anonymous visitors) to read active banners
DROP POLICY IF EXISTS "Public can view active hero banners" ON public.banners;
CREATE POLICY "Public can view active hero banners"
    ON public.banners
    FOR SELECT
    USING (is_active = true);

-- 2. Staff Policy: Admins & Staff have full control (Insert, Update, Delete)
DROP POLICY IF EXISTS "Admins full management for hero banners" ON public.banners;
CREATE POLICY "Admins full management for hero banners"
    ON public.banners
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert initial default hero banner matching Saryonaya branding
INSERT INTO public.banners (
    id,
    title,
    subtitle,
    image_url,
    mobile_image_url,
    button_text,
    button_link,
    is_active,
    display_order
) VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'Learn Anytime, Anywhere',
    'Upgrade your skills with expert-led online courses and take your career to the next level.',
    '/images/mockup/hero-student-3d.png',
    '/images/mockup/hero-mobile-banner-2x.png',
    'Explore Courses',
    '/courses',
    true,
    1
) ON CONFLICT (id) DO NOTHING;
