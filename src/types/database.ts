export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          clerk_user_id: string
          full_name: string
          email: string
          phone: string | null
          avatar_url: string | null
          role: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_user_id: string
          full_name: string
          email: string
          phone?: string | null
          avatar_url?: string | null
          role?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_user_id?: string
          full_name?: string
          email?: string
          phone?: string | null
          avatar_url?: string | null
          role?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      academic_branches: {
        Row: {
          id: string
          branch_code: string
          branch_name: string
          description: string | null
          icon: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          branch_code: string
          branch_name: string
          description?: string | null
          icon?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          branch_code?: string
          branch_name?: string
          description?: string | null
          icon?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      education_levels: {
        Row: {
          id: string
          level_name: string
          level_code: string
          description: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          level_name: string
          level_code: string
          description?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          level_name?: string
          level_code?: string
          description?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      colleges: {
        Row: {
          id: string
          college_name: string
          college_code: string | null
          college_type: string | null
          city: string | null
          state: string | null
          country: string | null
          website: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          college_name: string
          college_code?: string | null
          college_type?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          website?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          college_name?: string
          college_code?: string | null
          college_type?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          website?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      academic_qualifications: {
        Row: {
          id: string
          profile_id: string
          college_name: string | null
          college_id: string | null
          branch_id: string | null
          education_level_id: string | null
          degree: string | null
          field_of_study: string | null
          passed_out_year: number | null
          cgpa: string | null
          is_current: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          college_name?: string | null
          college_id?: string | null
          branch_id?: string | null
          education_level_id?: string | null
          degree?: string | null
          field_of_study?: string | null
          passed_out_year?: number | null
          cgpa?: string | null
          is_current?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          college_name?: string | null
          college_id?: string | null
          branch_id?: string | null
          education_level_id?: string | null
          degree?: string | null
          field_of_study?: string | null
          passed_out_year?: number | null
          cgpa?: string | null
          is_current?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          thumbnail_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          thumbnail_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          thumbnail_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          thumbnail_url: string | null
          category_id: string | null
          instructor_id: string | null
          price: number
          original_price: number | null
          currency: string
          is_free: boolean
          is_published: boolean
          is_featured: boolean
          level: string
          duration_hours: number
          certificate_eligible: boolean
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          thumbnail_url?: string | null
          category_id?: string | null
          instructor_id?: string | null
          price?: number
          original_price?: number | null
          currency?: string
          is_free?: boolean
          is_published?: boolean
          is_featured?: boolean
          level?: string
          duration_hours?: number
          certificate_eligible?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          thumbnail_url?: string | null
          category_id?: string | null
          instructor_id?: string | null
          price?: number
          original_price?: number | null
          currency?: string
          is_free?: boolean
          is_published?: boolean
          is_featured?: boolean
          level?: string
          duration_hours?: number
          certificate_eligible?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      course_branch_mappings: {
        Row: {
          id: string
          course_id: string
          branch_id: string
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          branch_id: string
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          branch_id?: string
          created_at?: string
        }
      }
      course_sections: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          sort_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          section_id: string
          course_id: string
          title: string
          slug: string
          description: string | null
          sort_order: number
          is_free_preview: boolean
          is_published: boolean
          duration_seconds: number
          mux_asset_id: string | null
          mux_playback_id: string | null
          mux_upload_id: string | null
          video_status: string
          video_quality: string | null
          processed_at: string | null
          notes: string | null
          resources: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section_id: string
          course_id: string
          title: string
          slug: string
          description?: string | null
          sort_order?: number
          is_free_preview?: boolean
          is_published?: boolean
          duration_seconds?: number
          mux_asset_id?: string | null
          mux_playback_id?: string | null
          mux_upload_id?: string | null
          video_status?: string
          video_quality?: string | null
          processed_at?: string | null
          notes?: string | null
          resources?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section_id?: string
          course_id?: string
          title?: string
          slug?: string
          description?: string | null
          sort_order?: number
          is_free_preview?: boolean
          is_published?: boolean
          duration_seconds?: number
          mux_asset_id?: string | null
          mux_playback_id?: string | null
          mux_upload_id?: string | null
          video_status?: string
          video_quality?: string | null
          processed_at?: string | null
          notes?: string | null
          resources?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          enrollment_type: string
          status: string
          progress_percent: number
          completed_lessons_count: number
          total_lessons_count: number
          purchased_at: string
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          enrollment_type?: string
          status?: string
          progress_percent?: number
          completed_lessons_count?: number
          total_lessons_count?: number
          purchased_at?: string
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          enrollment_type?: string
          status?: string
          progress_percent?: number
          completed_lessons_count?: number
          total_lessons_count?: number
          purchased_at?: string
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscription_plans: {
        Row: {
          id: string
          plan_name: string
          plan_code: string
          description: string | null
          price: number
          currency: string
          interval: string
          interval_count: number
          features: Json | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          plan_name: string
          plan_code: string
          description?: string | null
          price: number
          currency?: string
          interval?: string
          interval_count?: number
          features?: Json | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plan_name?: string
          plan_code?: string
          description?: string | null
          price?: number
          currency?: string
          interval?: string
          interval_count?: number
          features?: Json | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          student_id: string
          plan_id: string
          razorpay_subscription_id: string | null
          razorpay_customer_id: string | null
          status: string
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          canceled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          plan_id: string
          razorpay_subscription_id?: string | null
          razorpay_customer_id?: string | null
          status?: string
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          plan_id?: string
          razorpay_subscription_id?: string | null
          razorpay_customer_id?: string | null
          status?: string
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          student_id: string
          course_id: string | null
          subscription_id: string | null
          razorpay_order_id: string | null
          amount: number
          currency: string
          status: string
          receipt: string | null
          notes: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id?: string | null
          subscription_id?: string | null
          razorpay_order_id?: string | null
          amount: number
          currency?: string
          status?: string
          receipt?: string | null
          notes?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string | null
          subscription_id?: string | null
          razorpay_order_id?: string | null
          amount?: number
          currency?: string
          status?: string
          receipt?: string | null
          notes?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          razorpay_payment_id: string
          amount: number
          currency: string
          status: string
          payment_method: string | null
          razorpay_signature: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          razorpay_payment_id: string
          amount: number
          currency?: string
          status: string
          payment_method?: string | null
          razorpay_signature?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          razorpay_payment_id?: string
          amount?: number
          currency?: string
          status?: string
          payment_method?: string | null
          razorpay_signature?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      watch_progress: {
        Row: {
          id: string
          student_id: string
          lesson_id: string
          course_id: string
          position_seconds: number
          max_position_seconds: number
          completed: boolean
          completed_at: string | null
          last_watched_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          lesson_id: string
          course_id: string
          position_seconds?: number
          max_position_seconds?: number
          completed?: boolean
          completed_at?: string | null
          last_watched_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          lesson_id?: string
          course_id?: string
          position_seconds?: number
          max_position_seconds?: number
          completed?: boolean
          completed_at?: string | null
          last_watched_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      quizzes: {
        Row: {
          id: string
          course_id: string
          section_id: string | null
          lesson_id: string | null
          title: string
          description: string | null
          passing_score: number
          time_limit_minutes: number | null
          max_attempts: number | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          section_id?: string | null
          lesson_id?: string | null
          title: string
          description?: string | null
          passing_score?: number
          time_limit_minutes?: number | null
          max_attempts?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          section_id?: string | null
          lesson_id?: string | null
          title?: string
          description?: string | null
          passing_score?: number
          time_limit_minutes?: number | null
          max_attempts?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      quiz_questions: {
        Row: {
          id: string
          quiz_id: string
          question_text: string
          question_type: string
          explanation: string | null
          points: number
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          quiz_id: string
          question_text: string
          question_type?: string
          explanation?: string | null
          points?: number
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          quiz_id?: string
          question_text?: string
          question_type?: string
          explanation?: string | null
          points?: number
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      quiz_options: {
        Row: {
          id: string
          question_id: string
          option_text: string
          is_correct: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          question_id: string
          option_text: string
          is_correct?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          question_id?: string
          option_text?: string
          is_correct?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          quiz_id: string
          student_id: string
          score: number
          percentage: number
          passed: boolean
          answers: Json | null
          started_at: string
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          quiz_id: string
          student_id: string
          score?: number
          percentage?: number
          passed?: boolean
          answers?: Json | null
          started_at?: string
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          quiz_id?: string
          student_id?: string
          score?: number
          percentage?: number
          passed?: boolean
          answers?: Json | null
          started_at?: string
          completed_at?: string | null
          created_at?: string
        }
      }
      assignments: {
        Row: {
          id: string
          course_id: string
          lesson_id: string | null
          title: string
          description: string | null
          max_score: number
          due_date: string | null
          file_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          lesson_id?: string | null
          title: string
          description?: string | null
          max_score?: number
          due_date?: string | null
          file_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          lesson_id?: string | null
          title?: string
          description?: string | null
          max_score?: number
          due_date?: string | null
          file_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          student_id: string
          course_id: string
          certificate_number: string
          issued_at: string
          verification_url: string | null
          pdf_url: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          certificate_number: string
          issued_at?: string
          verification_url?: string | null
          pdf_url?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          certificate_number?: string
          issued_at?: string
          verification_url?: string | null
          pdf_url?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Course = Database['public']['Tables']['courses']['Row']
export type AcademicBranch = Database['public']['Tables']['academic_branches']['Row']
export type EducationLevel = Database['public']['Tables']['education_levels']['Row']
export type College = Database['public']['Tables']['colleges']['Row']
export type AcademicQualification = Database['public']['Tables']['academic_qualifications']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type CourseBranchMapping = Database['public']['Tables']['course_branch_mappings']['Row']
export type CourseSection = Database['public']['Tables']['course_sections']['Row']
export type Lesson = Database['public']['Tables']['lessons']['Row']
export type Enrollment = Database['public']['Tables']['enrollments']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type SubscriptionPlan = Database['public']['Tables']['subscription_plans']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']
export type WatchProgress = Database['public']['Tables']['watch_progress']['Row']
export type Quiz = Database['public']['Tables']['quizzes']['Row']
export type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row']
export type QuizOption = Database['public']['Tables']['quiz_options']['Row']
export type QuizAttempt = Database['public']['Tables']['quiz_attempts']['Row']
export type Assignment = Database['public']['Tables']['assignments']['Row']
export type Certificate = Database['public']['Tables']['certificates']['Row']

export type InsertProfile = Database['public']['Tables']['profiles']['Insert']
export type InsertCourse = Database['public']['Tables']['courses']['Insert']
export type InsertAcademicBranch = Database['public']['Tables']['academic_branches']['Insert']
export type InsertCategory = Database['public']['Tables']['categories']['Insert']
export type InsertCourseBranchMapping = Database['public']['Tables']['course_branch_mappings']['Insert']
export type InsertCourseSection = Database['public']['Tables']['course_sections']['Insert']
export type InsertLesson = Database['public']['Tables']['lessons']['Insert']
export type InsertEnrollment = Database['public']['Tables']['enrollments']['Insert']
export type InsertSubscription = Database['public']['Tables']['subscriptions']['Insert']
export type InsertSubscriptionPlan = Database['public']['Tables']['subscription_plans']['Insert']
export type InsertOrder = Database['public']['Tables']['orders']['Insert']
export type InsertPayment = Database['public']['Tables']['payments']['Insert']
export type InsertWatchProgress = Database['public']['Tables']['watch_progress']['Insert']
export type InsertQuiz = Database['public']['Tables']['quizzes']['Insert']
export type InsertCertificate = Database['public']['Tables']['certificates']['Insert']

export type UpdateProfile = Database['public']['Tables']['profiles']['Update']
export type UpdateCourse = Database['public']['Tables']['courses']['Update']
export type UpdateAcademicBranch = Database['public']['Tables']['academic_branches']['Update']
export type UpdateCategory = Database['public']['Tables']['categories']['Update']
export type UpdateCourseBranchMapping = Database['public']['Tables']['course_branch_mappings']['Update']
export type UpdateCourseSection = Database['public']['Tables']['course_sections']['Update']
export type UpdateLesson = Database['public']['Tables']['lessons']['Update']
export type UpdateEnrollment = Database['public']['Tables']['enrollments']['Update']
export type UpdateSubscription = Database['public']['Tables']['subscriptions']['Update']
export type UpdateSubscriptionPlan = Database['public']['Tables']['subscription_plans']['Update']
export type UpdateOrder = Database['public']['Tables']['orders']['Update']
export type UpdatePayment = Database['public']['Tables']['payments']['Update']
export type UpdateWatchProgress = Database['public']['Tables']['watch_progress']['Update']
export type UpdateQuiz = Database['public']['Tables']['quizzes']['Update']
export type UpdateCertificate = Database['public']['Tables']['certificates']['Update']

export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface CourseWithDetails extends Course {
  category?: Category | null
  sections?: (CourseSection & { lessons: Lesson[] })[]
  eligible_branches?: AcademicBranch[]
  enrolled?: boolean
  progress?: number
}

export interface StudentAcademicProfile {
  profile: Profile
  qualification?: (AcademicQualification & { branch?: AcademicBranch; college?: College }) | null
}

export interface HeroBanner {
  id: string
  title: string
  subtitle?: string | null
  image_url?: string | null
  mobile_image_url?: string | null
  button_text?: string | null
  button_link?: string | null
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export type Banner = HeroBanner
