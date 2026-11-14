-- ============================================================================
-- SARYONAYA Migration #100: Seed Data
-- ============================================================================

-- Categories Seed
INSERT INTO categories (id, name, slug, description, icon, sort_order, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Programming', 'programming', 'Learn to code in Python, JavaScript, Java, and more', 'code', 1, now(), now()),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Data Science', 'data-science', 'Data analytics, machine learning, and AI', 'chart', 2, now(), now()),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Business', 'business', 'Leadership, negotiation, and entrepreneurship', 'business', 3, now(), now()),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'Design', 'design', 'UI/UX, graphic design, and creative skills', 'palette', 4, now(), now()),
  ('00000000-0000-0000-0000-000000000005'::uuid, 'Languages', 'languages', 'Learn new languages and communication skills', 'language', 5, now(), now())
ON CONFLICT DO NOTHING;

-- Academic Branches Seed
INSERT INTO academic_branches (id, branch_code, branch_name, description, sort_order, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000100'::uuid, 'CSE', 'Computer Science Engineering', 'Core computer science and programming', 1, now(), now()),
  ('00000000-0000-0000-0000-000000000101'::uuid, 'ECE', 'Electronics and Communication Engineering', 'Electronics and communication systems', 2, now(), now()),
  ('00000000-0000-0000-0000-000000000102'::uuid, 'EEE', 'Electrical and Electronics Engineering', 'Electrical and power systems', 3, now(), now()),
  ('00000000-0000-0000-0000-000000000103'::uuid, 'IT', 'Information Technology', 'IT infrastructure and networking', 4, now(), now()),
  ('00000000-0000-0000-0000-000000000104'::uuid, 'AI&ML', 'Artificial Intelligence & Machine Learning', 'AI, ML, and data science', 5, now(), now())
ON CONFLICT DO NOTHING;

-- Subscription Plans Seed
INSERT INTO subscription_plans (id, name, description, price, currency, interval, features, sort_order, is_active, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000001000'::uuid, 'Monthly', 'Access to all courses with monthly subscription', 499, 'INR', 'month', '["Full course library access", "300 minutes of video per month", "Progress tracking"]'::jsonb, 1, true, now(), now()),
  ('00000000-0000-0000-0000-000000001001'::uuid, 'Quarterly', 'Best value - 3 months access for the price of 2', 1299, 'INR', 'quarter', '["Full course library access", "3000 minutes of video", "Priority support"]'::jsonb, 2, true, now(), now()),
  ('00000000-0000-0000-0000-000000001002'::uuid, 'Yearly', 'Complete access - 1 year of premium learning', 3999, 'INR', 'year', '["Full course library access", "Unlimited video", "Certificates", "24/7 support"]'::jsonb, 3, true, now(), now())
ON CONFLICT DO NOTHING;

-- Demo coupons
INSERT INTO coupons (id, code, discount_type, discount_value, max_uses, used_count, valid_from, valid_until, min_purchase_amount, is_active, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000002000'::uuid, 'WELCOME20', 'percent', 20, 100, 0, now() - interval '30 days', now() + interval '6 months', 0, true, now(), now()),
  ('00000000-0000-0000-0000-000000002001'::uuid, 'FIRSTCOURSE10', 'percent', 10, 50, 0, now() - interval '14 days', now() + interval '90 days', 0, true, now(), now()),
  ('00000000-0000-0000-0000-000000002002'::uuid, 'STUDENT5', 'fixed', 50, 200, 0, now() - interval '7 days', now() + interval '6 months', 0, true, now(), now())
ON CONFLICT DO NOTHING;

-- Audit log initial entry
INSERT INTO audit_logs (id, action, entity_type, entity_id, user_id, ip_address, user_agent, metadata, created_at)
VALUES
  ('00000000-0000-0000-0000-000000003000'::uuid, 'SYSTEM', 'SEED', 'DATABASE', NULL, '0.0.0.0', 'Initial seed', '{"module": "database_seed"}'::jsonb, now())
ON CONFLICT DO NOTHING;
