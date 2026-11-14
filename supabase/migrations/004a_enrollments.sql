-- ============================================================================
-- SARYONAYA Migration #004a: Enrollments
-- ============================================================================

CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_type TEXT NOT NULL DEFAULT 'one_time',
  status TEXT NOT NULL DEFAULT 'active',
  expires_at TIMESTAMPTZ,
  billing_cycle_start TIMESTAMPTZ,
  billing_cycle_end TIMESTAMPTZ,
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own enrollments" ON enrollments
  USING (student_id = current_setting('request.jwt.claim.sub', true)::uuid)
  WITH CHECK (student_id = current_setting('request.jwt.claim.sub', true)::uuid);

-- Also allow supabase_admin to bypass
CREATE POLICY "Supabase admin can view all enrollments" ON enrollments
  FOR ALL USING (current_setting('request.jwt.claim.email') = 'supabase_admin@mux.io');
