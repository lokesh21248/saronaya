-- ============================================================================
-- SARYONAYA Migration #003b: Courses & Branch Mappings
-- ============================================================================

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  thumbnail_url TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'INR',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  is_preview_free BOOLEAN NOT NULL DEFAULT false,
  access_all_branches BOOLEAN NOT NULL DEFAULT false,
  total_lessons INTEGER NOT NULL DEFAULT 0,
  total_duration INTEGER NOT NULL DEFAULT 0,
  difficulty_level TEXT,
  language TEXT NOT NULL DEFAULT 'English',
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_courses_published ON courses(published);
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_slug ON courses(slug);

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE course_branch_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  branch_id UUID NOT NULL REFERENCES academic_branches(id) ON DELETE CASCADE,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(course_id, branch_id)
);

CREATE INDEX idx_course_branch_mapping_course_id ON course_branch_mappings(course_id);
CREATE INDEX idx_course_branch_mapping_branch_id ON course_branch_mappings(branch_id);

CREATE TRIGGER update_course_branch_mappings_updated_at BEFORE UPDATE ON course_branch_mappings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE instructor_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'instructor',
  is_primary BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(course_id, instructor_id)
);

CREATE INDEX idx_instructor_courses_instructor_id ON instructor_courses(instructor_id);

CREATE TRIGGER update_instructor_courses_updated_at BEFORE UPDATE ON instructor_courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_branch_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view published courses" ON courses
  FOR SELECT USING (published = true);

CREATE POLICY "Users can view branch mappings" ON course_branch_mappings
  FOR SELECT USING (true);

CREATE POLICY "Users can view own instructor courses" ON instructor_courses
  FOR SELECT USING (instructor_id = current_setting('request.jwt.claim.sub', true)::uuid);

-- Note: Course sections, lessons, and lesson_resources are in 003c
