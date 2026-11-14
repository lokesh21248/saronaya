# SARYONAYA - Online Learning Platform

Next.js 16 + TypeScript LMS platform with Supabase, Clerk, Mux, Razorpay.

## Project Structure

```
saryonaya/
├── src/
│   ├── app/
│   │   ├── (marketing)/    # Public marketing pages
│   │   ├── (auth)/         # Sign-in, sign-up pages
│   │   ├── student/        # Student portal pages
│   │   ├── learn/          # Course player
│   │   ├── admin/          # Admin dashboard
│   │   └── api/            # API routes
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   └── layout/         # Layout components
│   ├── features/           # Feature modules
│   ├── lib/                # Utility libraries
│   │   ├── supabase/       # Supabase clients
│   │   ├── clerk/          # Clerk integration
│   │   ├── mux/            # Mux video service
│   │   ├── razorpay/       # Razorpay integration
│   │   └── services/       # Business logic
│   ├── types/              # TypeScript types
│   └── hooks/              # Custom hooks
├── supabase/
│   ├── migrations/         # Database migrations
│   └── seed.sql            # Seed data
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── README.md               # This file
└── README-supabase.md      # Supabase setup guide
```

## Completed Features (Phase 1 & 2)

### Phase 1 - Project Foundation
- ✅ Next.js 16 project with TypeScript
- ✅ Tailwind CSS 4 with Saryonaya theme
- ✅ Navy blue + golden yellow color scheme
- ✅ Clerk authentication provider
- ✅ Responsive UI components (Button, Card, Alert, Input, Select, etc.)
- ✅ Git initialized
- ✅ Build successful

### Phase 2 - Supabase Database
- ✅ Database migrations (001-100)
- ✅ RLS policies configured
- ✅ Seed data for categories, branches, plans, coupons
- ✅ Type definitions for all tables
- ✅ Supabase client configuration (client + admin)

### Key Technology Stack
| Service | Purpose |
|---------|---------|
| Next.js 16 + TypeScript | Frontend, backend, SSR |
| Supabase (PostgreSQL) | Database, RLS, storage |
| Clerk | Authentication, sessions |
| Mux | Video upload, streaming, playback |
| Razorpay | Payments, subscriptions |
| Resend | Transactional emails |
| Cloudflare | DNS, SSL, CDN |

## Database Schema (Modules)

| Module | Tables |
|--------|--------|
| Authentication | `profiles`, `user_roles` |
| Academic | `education_levels`, `colleges`, `academic_branches`, `academic_qualifications` |
| Courses | `categories`, `courses`, `course_branch_mappings`, `instructor_courses` |
| Content | `course_sections`, `lessons`, `lesson_resources` |
| Enrollment | `enrollments` |
| Subscriptions | `subscription_plans`, `subscriptions` |
| Payments | `orders`, `payments`, `refunds`, `payment_webhook_events` |
| Video Learning | `watch_progress`, `lesson_completions` |
| Assessments | `quizzes`, `quiz_questions`, `quiz_options`, `quiz_attempts`, `assignments`, `assignment_submissions` |
| Certificates | `certificates` |
| Engagement | `reviews`, `wishlists` |
| Administration | `coupons`, `support_tickets`, `audit_logs` |

## Getting Started

### 1. Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 2. Database Setup
```bash
# Using Supabase CLI
supabase db push

# Or manually run migrations in order:
psql -f supabase/migrations/001_profiles.sql
psql -f supabase/migrations/002_academic.sql
psql -f supabase/migrations/003a_categories.sql
psql -f supabase/migrations/003b_courses.sql
psql -f supabase/migrations/003c_course_content.sql
psql -f supabase/migrations/004a_enrollments.sql
psql -f supabase/migrations/004b_subscriptions.sql
psql -f supabase/migrations/005_payments.sql
psql -f supabase/migrations/006_learning.sql
psql -f supabase/migrations/007b_assignments_certificates.sql
psql -f supabase/migrations/009_admin.sql
psql -f supabase/migrations/100_seed.sql
```

### 3. Create Storage Buckets (Supabase Dashboard)
```
course-thumbnails (public)
profile-images (private)
course-materials (private)
assignments (private)
certificates (private)
```

### 4. Run Development Server
```bash
npm run dev
# Open http://localhost:3000
```

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/branches` | GET, POST | List/create academic branches |
| `/api/webhooks/razorpay` | POST | Process Razorpay payments |
| `/api/admin/branches` | GET, POST | Admin branch management |

## Key Features

- **Authentication**: Clerk with email/phone
- **Course Catalog**: Branch-based visibility, categories
- **Student Dashboard**: Enrollments, progress, certificates
- **Video Learning**: Mux player with progress tracking
- **Payments**: Razorpay checkout, subscriptions
- **Admin Dashboard**: Course management, branches, students
- **Assessments**: Quizzes, assignments
- **Certificates**: Auto-generated on course completion

## Next Steps (Ongoing Development)

1. Create remaining API routes
2. Build student portal UI pages
3. Build admin dashboard UI pages
4. Implement video player with Mux
5. Implement payment flows with Razorpay
6. Add admin authentication (Clerk)
7. Test with Playwright
8. Deploy to Vercel

## License

MIT
