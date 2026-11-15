-- ============================================================================
-- SARVONAYA — Complete Bi-Directional Schema Synchronization
-- Connects Customer Portal (saronya.vercel.app) <---> Admin Portal (admin-saronya.vercel.app)
-- ============================================================================

-- 1. Profiles Table: support both Clerk ID conventions
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS clerk_id VARCHAR(255);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS clerk_user_id VARCHAR(255);
CREATE INDEX IF NOT EXISTS idx_profiles_clerk_id ON public.profiles(clerk_id);
CREATE INDEX IF NOT EXISTS idx_profiles_clerk_user_id ON public.profiles(clerk_user_id);
UPDATE public.profiles SET clerk_user_id = clerk_id WHERE clerk_user_id IS NULL AND clerk_id IS NOT NULL;
UPDATE public.profiles SET clerk_id = clerk_user_id WHERE clerk_id IS NULL AND clerk_user_id IS NOT NULL;

-- 2. Academic Branches Table: support both code & branch_code, name & branch_name, sort_order
ALTER TABLE public.academic_branches ADD COLUMN IF NOT EXISTS branch_code VARCHAR(50);
ALTER TABLE public.academic_branches ADD COLUMN IF NOT EXISTS branch_name VARCHAR(255);
ALTER TABLE public.academic_branches ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
UPDATE public.academic_branches SET branch_code = code WHERE branch_code IS NULL AND code IS NOT NULL;
UPDATE public.academic_branches SET branch_name = name WHERE branch_name IS NULL AND name IS NOT NULL;

-- 3. Academic Qualifications Table: support both student_id & profile_id, field_of_study, is_current
ALTER TABLE public.academic_qualifications ADD COLUMN IF NOT EXISTS profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
ALTER TABLE public.academic_qualifications ADD COLUMN IF NOT EXISTS field_of_study VARCHAR(255);
ALTER TABLE public.academic_qualifications ADD COLUMN IF NOT EXISTS is_current BOOLEAN DEFAULT true;
UPDATE public.academic_qualifications SET profile_id = student_id WHERE profile_id IS NULL AND student_id IS NOT NULL;
UPDATE public.academic_qualifications SET student_id = profile_id WHERE student_id IS NULL AND profile_id IS NOT NULL;

-- 4. Orders Table: support student_id, clerk_user_id, amount, receipt, subscription_id
ALTER TABLE public.orders ALTER COLUMN student_id DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN net_amount DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN order_type DROP NOT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS clerk_user_id VARCHAR(255);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS amount NUMERIC(10,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS receipt VARCHAR(100);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subscription_id VARCHAR(255);

-- 5. Enrollments Table: support enrollment_type & purchased_at
ALTER TABLE public.enrollments ALTER COLUMN access_type DROP NOT NULL;
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS enrollment_type VARCHAR(50) DEFAULT 'individual_purchase';
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS purchased_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());
UPDATE public.enrollments SET access_type = 'individual_purchase' WHERE access_type IS NULL;

-- 6. Course Branch Mapping Table alias
CREATE TABLE IF NOT EXISTS public.course_branch_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    branch_id UUID NOT NULL REFERENCES public.academic_branches(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(course_id, branch_id)
);

-- Copy existing mappings to course_branch_mappings if any
INSERT INTO public.course_branch_mappings (course_id, branch_id)
SELECT course_id, branch_id FROM public.course_branch_mapping
ON CONFLICT (course_id, branch_id) DO NOTHING;
