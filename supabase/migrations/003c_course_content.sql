-- ============================================================================
-- SARYONAYA Migration #003c: Course Content (Sections, Lessons, Resources)
-- ============================================================================

CREATE TABLE course_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_free BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_course_sections_course_id ON course_sections(course_id);

CREATE TRIGGER update_course_sections_updated_at BEFORE UPDATE ON course_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  lesson_type TEXT NOT NULL DEFAULT 'video',
  mux_asset_id TEXT,
  mux_playback_id TEXT,
  mux_upload_id TEXT,
  video_status TEXT NOT NULL DEFAULT 'pending',
  duration_seconds INTEGER,
  video_quality TEXT,
  is_free BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lessons_section_id ON lessons(section_id);
CREATE INDEX idx_lessons_video_status ON lessons(video_status);

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE lesson_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL DEFAULT 'document',
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lesson_resources_lesson_id ON lesson_resources(lesson_id);

CREATE TRIGGER update_lesson_resources_updated_at BEFORE UPDATE ON lesson_resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies for course content
ALTER TABLE course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view sections of published courses" ON course_sections
  FOR SELECT USING (course_id IN (
    SELECT id FROM courses WHERE published = true
  ));

CREATE POLICY "Users can view lessons within published sections" ON lessons
  FOR SELECT USING (section_id IN (
    SELECT id FROM course_sections WHERE course_id IN (
      SELECT id FROM courses WHERE published = true
    )
  ));
