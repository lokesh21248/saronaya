-- ============================================================================
-- SARYONAYA Migration #002a: Academic Tables
-- ============================================================================

-- Education levels
CREATE TABLE education_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level_name TEXT NOT NULL,
  level_code TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_education_levels_active ON education_levels(is_active);

-- Colleges
CREATE TABLE colleges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_name TEXT NOT NULL,
  college_code TEXT,
  college_type TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  website TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_colleges_active ON colleges(is_active);

-- Academic branches (course category)
CREATE TABLE academic_branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_code TEXT NOT NULL,
  branch_name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_academic_branches_active ON academic_branches(is_active);

-- Academic qualifications
CREATE TABLE academic_qualifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  college_name TEXT,
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  branch_id UUID REFERENCES academic_branches(id) ON DELETE SET NULL,
  education_level_id UUID REFERENCES education_levels(id) ON DELETE SET NULL,
  degree TEXT,
  field_of_study TEXT,
  passed_out_year INTEGER,
  cgpa TEXT,
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_qualifications_profile_id ON academic_qualifications(profile_id);
CREATE INDEX idx_qualifications_branch_id ON academic_qualifications(branch_id);

-- Update trigger for updated_at
CREATE TRIGGER update_academic_qualifications_updated_at BEFORE UPDATE ON academic_qualifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies for academic tables
ALTER TABLE academic_qualifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own qualifications" ON academic_qualifications
  FOR SELECT USING (profile_id = current_setting('request.jwt.claim.sub', true)::uuid);
