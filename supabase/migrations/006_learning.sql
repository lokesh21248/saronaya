-- ============================================================================
-- SARYONAYA Migration #006a: Watch Progress
-- ============================================================================

CREATE TABLE watch_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  position_seconds INTEGER NOT NULL DEFAULT 0,
  played_seconds INTEGER NOT NULL DEFAULT 0,
  paused_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

CREATE INDEX idx_watch_progress_student_id ON watch_progress(student_id);
CREATE INDEX idx_watch_progress_lesson_id ON watch_progress(lesson_id);

CREATE TRIGGER update_watch_progress_updated_at BEFORE UPDATE ON watch_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies
ALTER TABLE watch_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own watch progress" ON watch_progress
  USING (student_id = current_setting('request.jwt.claim.sub', true)::uuid)
  WITH CHECK (student_id = current_setting('request.jwt.claim.sub', true)::uuid);

-- ============================================================================
-- SARYONAYA Migration #006b: Lesson Completions
-- ============================================================================

CREATE TABLE lesson_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

CREATE INDEX idx_lesson_completions_student_id ON lesson_completions(student_id);

CREATE TRIGGER update_lesson_completions_updated_at BEFORE UPDATE ON lesson_completions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies
ALTER TABLE lesson_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own completions" ON lesson_completions
  USING (student_id = current_setting('request.jwt.claim.sub', true)::uuid)
  WITH CHECK (student_id = current_setting('request.jwt.claim.sub', true)::uuid);

-- ============================================================================
-- SARYONAYA Migration #007a: Quizzes
-- ============================================================================

CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  section_id UUID REFERENCES course_sections(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  passing_score NUMERIC(5, 2) NOT NULL DEFAULT 50,
  total_attempts INTEGER,
  time_limit_seconds INTEGER,
  is_passed_notification_sent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_quizzes_course_id ON quizzes(course_id);
CREATE INDEX idx_quizzes_status ON quizzes(status);

CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice',
  points INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);

CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE quiz_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_quiz_options_question_id ON quiz_options(question_id);

CREATE TRIGGER update_quiz_options_updated_at BEFORE UPDATE ON quiz_options
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'in_progress',
  score NUMERIC(5, 2),
  total_questions INTEGER,
  correct_answers INTEGER,
  time_taken_seconds INTEGER,
  UNIQUE(quiz_id, student_id)
);

CREATE INDEX idx_quiz_attempts_student_id ON quiz_attempts(student_id);
CREATE INDEX idx_quiz_attempts_status ON quiz_attempts(status);

CREATE TRIGGER update_quiz_attempts_updated_at BEFORE UPDATE ON quiz_attempts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view published quizzes" ON quizzes
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users can view their quiz attempts" ON quiz_attempts
  FOR SELECT USING (student_id = current_setting('request.jwt.claim.sub', true)::uuid);
