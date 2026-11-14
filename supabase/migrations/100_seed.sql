-- ============================================================================
-- SARYONAYA Migration #100: Comprehensive Seed Data
-- ============================================================================
-- Run this in your Supabase SQL Editor to populate all master branches,
-- categories, subscription plans, demo coupons, courses, and lessons.
-- ============================================================================

-- 1. Categories Seed
INSERT INTO categories (id, name, slug, description, icon, sort_order, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Programming', 'programming', 'Learn to code in Python, JavaScript, Java, and more', 'code', 1, now(), now()),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Data Science', 'data-science', 'Data analytics, machine learning, and AI', 'chart', 2, now(), now()),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Core Engineering', 'core-engineering', 'VLSI, embedded systems, robotics, and CAD', 'cpu', 3, now(), now()),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'Cloud & DevOps', 'cloud-devops', 'AWS, Azure, Docker, Kubernetes, and CI/CD', 'cloud', 4, now(), now()),
  ('00000000-0000-0000-0000-000000000005'::uuid, 'Civil & Structural', 'civil-structural', 'AutoCAD Civil 3D, STAAD Pro, and structural analysis', 'building', 5, now(), now())
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- 2. Academic Branches Seed
INSERT INTO academic_branches (id, branch_code, branch_name, description, sort_order, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000100'::uuid, 'CSE', 'Computer Science Engineering', 'Core computer science, system software & web development', 1, now(), now()),
  ('00000000-0000-0000-0000-000000000101'::uuid, 'AI&ML', 'Artificial Intelligence & Machine Learning', 'Neural networks, computer vision, NLP & generative AI', 2, now(), now()),
  ('00000000-0000-0000-0000-000000000102'::uuid, 'IT', 'Information Technology', 'Cloud infrastructure, enterprise databases & cybersecurity', 3, now(), now()),
  ('00000000-0000-0000-0000-000000000103'::uuid, 'ECE', 'Electronics and Communication Engineering', 'VLSI design, embedded microcontrollers & signal processing', 4, now(), now()),
  ('00000000-0000-0000-0000-000000000104'::uuid, 'EEE', 'Electrical and Electronics Engineering', 'Power electronics, smart energy grids & machinery control', 5, now(), now()),
  ('00000000-0000-0000-0000-000000000105'::uuid, 'MECH', 'Mechanical Engineering', 'CAD/CAM modeling, robotics & thermal dynamics', 6, now(), now()),
  ('00000000-0000-0000-0000-000000000106'::uuid, 'CIVIL', 'Civil Engineering', 'Structural design, AutoCAD & smart urban infrastructure', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET
  branch_code = EXCLUDED.branch_code,
  branch_name = EXCLUDED.branch_name,
  description = EXCLUDED.description;

-- 3. Subscription Plans Seed
INSERT INTO subscription_plans (id, name, description, price, currency, interval, features, sort_order, is_active, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000001000'::uuid, 'Monthly Pro', 'Full access to all branch-specific courses', 499, 'INR', 'month', '["Branch course library access", "Mux HD video streaming", "PDF lecture notes", "Chapter quizzes"]'::jsonb, 1, true, now(), now()),
  ('00000000-0000-0000-0000-000000001001'::uuid, 'Quarterly Accelerator', 'Best value for semester exam preparation', 1299, 'INR', 'quarter', '["Everything in Monthly", "Save 15%", "Verified completion certificates", "Exam question banks"]'::jsonb, 2, true, now(), now()),
  ('00000000-0000-0000-0000-000000001002'::uuid, 'Annual Mastery', 'Complete 1-year pass across all engineering disciplines', 3999, 'INR', 'year', '["Access ALL engineering branches", "Save 35%", "Internship interview referrals", "Unlimited certificates"]'::jsonb, 3, true, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  features = EXCLUDED.features;

-- 4. Sample Courses Seed
INSERT INTO courses (id, title, slug, short_description, description, price, currency, category_id, published, is_preview_free, access_all_branches, total_lessons, total_duration, difficulty_level, status, sort_order, thumbnail_url, created_at, updated_at)
VALUES
  (
    '00000000-0000-0000-0000-000000000201'::uuid,
    'Python for Beginners to Master',
    'python-for-beginners',
    'Master Python programming from core syntax to OOP, algorithms and real-world projects.',
    'A comprehensive roadmap designed specifically for engineering students to build strong foundations in Python 3.',
    999,
    'INR',
    '00000000-0000-0000-0000-000000000001'::uuid,
    true,
    true,
    true,
    6,
    720,
    'Beginner',
    'published',
    1,
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000202'::uuid,
    'Modern Full-Stack React & Next.js',
    'react-nextjs-development',
    'Build scalable web apps with React 19, Next.js App Router, Tailwind CSS and Server Components.',
    'Learn production frontend and full-stack development with Server Components, Actions, Supabase, and deployment.',
    1299,
    'INR',
    '00000000-0000-0000-0000-000000000001'::uuid,
    true,
    true,
    false,
    5,
    900,
    'Intermediate',
    'published',
    2,
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000203'::uuid,
    'Applied Machine Learning & Deep Learning',
    'applied-machine-learning',
    'End-to-end ML pipeline: Scikit-learn, PyTorch, Model Evaluation and Cloud Deployment.',
    'Designed for AI & ML, CSE, and IT students to work with real-world datasets and neural network training.',
    1499,
    'INR',
    '00000000-0000-0000-0000-000000000002'::uuid,
    true,
    true,
    false,
    6,
    1080,
    'Advanced',
    'published',
    3,
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000204'::uuid,
    'Embedded Systems & VLSI Digital Design',
    'embedded-systems-vlsi',
    'ARM Cortex programming, Verilog HDL synthesis, and FPGA prototyping.',
    'Curated specifically for Electronics (ECE) and Electrical (EEE) students.',
    1199,
    'INR',
    '00000000-0000-0000-0000-000000000003'::uuid,
    true,
    true,
    false,
    5,
    840,
    'Intermediate',
    'published',
    4,
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    now(),
    now()
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  published = EXCLUDED.published;

-- 5. Course Branch Mappings Seed
INSERT INTO course_branch_mappings (course_id, branch_id, is_available)
VALUES
  -- Python: All branches
  ('00000000-0000-0000-0000-000000000201'::uuid, '00000000-0000-0000-0000-000000000100'::uuid, true),
  ('00000000-0000-0000-0000-000000000201'::uuid, '00000000-0000-0000-0000-000000000101'::uuid, true),
  ('00000000-0000-0000-0000-000000000201'::uuid, '00000000-0000-0000-0000-000000000102'::uuid, true),
  ('00000000-0000-0000-0000-000000000201'::uuid, '00000000-0000-0000-0000-000000000103'::uuid, true),
  -- React: CSE, IT, AI&ML
  ('00000000-0000-0000-0000-000000000202'::uuid, '00000000-0000-0000-0000-000000000100'::uuid, true),
  ('00000000-0000-0000-0000-000000000202'::uuid, '00000000-0000-0000-0000-000000000101'::uuid, true),
  ('00000000-0000-0000-0000-000000000202'::uuid, '00000000-0000-0000-0000-000000000102'::uuid, true),
  -- Machine Learning: AI&ML, CSE, IT
  ('00000000-0000-0000-0000-000000000203'::uuid, '00000000-0000-0000-0000-000000000101'::uuid, true),
  ('00000000-0000-0000-0000-000000000203'::uuid, '00000000-0000-0000-0000-000000000100'::uuid, true),
  ('00000000-0000-0000-0000-000000000203'::uuid, '00000000-0000-0000-0000-000000000102'::uuid, true),
  -- VLSI: ECE, EEE
  ('00000000-0000-0000-0000-000000000204'::uuid, '00000000-0000-0000-0000-000000000103'::uuid, true),
  ('00000000-0000-0000-0000-000000000204'::uuid, '00000000-0000-0000-0000-000000000104'::uuid, true)
ON CONFLICT (course_id, branch_id) DO NOTHING;

-- 6. Course Sections Seed (Python)
INSERT INTO course_sections (id, course_id, title, description, sort_order, is_free, is_published, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000301'::uuid, '00000000-0000-0000-0000-000000000201'::uuid, 'Section 1: Python Fundamentals & Setup', 'Getting started with syntax, variables, and IDE', 1, true, true, now(), now()),
  ('00000000-0000-0000-0000-000000000302'::uuid, '00000000-0000-0000-0000-000000000201'::uuid, 'Section 2: Data Structures & OOP', 'Collections, functions, and object-oriented design', 2, false, true, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- 7. Lessons Seed (Python Section 1)
INSERT INTO lessons (id, section_id, title, description, lesson_type, video_status, duration_seconds, is_free, is_published, sort_order, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000401'::uuid, '00000000-0000-0000-0000-000000000301'::uuid, 'Welcome to Saryonaya & Course Overview', 'Course roadmap and learning goals', 'video', 'ready', 600, true, true, 1, now(), now()),
  ('00000000-0000-0000-0000-000000000402'::uuid, '00000000-0000-0000-0000-000000000301'::uuid, 'Variables, Data Types and Operators', 'Numeric types, strings, arithmetic and logic operators', 'video', 'ready', 1080, true, true, 2, now(), now()),
  ('00000000-0000-0000-0000-000000000403'::uuid, '00000000-0000-0000-0000-000000000301'::uuid, 'Conditionals and Decision Making', 'If, elif, else and pattern matching', 'video', 'ready', 1320, false, true, 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- 8. Demo Coupons
INSERT INTO coupons (id, code, discount_type, discount_value, max_uses, used_count, valid_from, valid_until, min_purchase_amount, is_active, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000002000'::uuid, 'WELCOME20', 'percent', 20, 100, 0, now() - interval '30 days', now() + interval '6 months', 0, true, now(), now()),
  ('00000000-0000-0000-0000-000000002001'::uuid, 'FIRSTCOURSE10', 'percent', 10, 50, 0, now() - interval '14 days', now() + interval '90 days', 0, true, now(), now()),
  ('00000000-0000-0000-0000-000000002002'::uuid, 'STUDENT50', 'fixed', 50, 200, 0, now() - interval '7 days', now() + interval '6 months', 0, true, now(), now())
ON CONFLICT (id) DO NOTHING;
