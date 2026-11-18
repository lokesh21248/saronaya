import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    let query = supabaseAdmin
      .from('courses')
      .select(`
        *,
        category:categories(*),
        primary_instructor:primary_instructor_id(*),
        course_sections(
          id,
          title,
          sort_order,
          lessons(
            id,
            title,
            slug,
            sort_order,
            duration_minutes,
            duration_seconds,
            is_preview,
            is_published,
            mux_playback_id
          )
        )
      `);

    // Use UUID query or slug query depending on format to avoid PostgreSQL uuid cast error
    if (UUID_REGEX.test(slug)) {
      query = query.or(`slug.eq.${slug},id.eq.${slug}`);
    } else {
      query = query.eq('slug', slug);
    }

    const { data: course, error } = await query.maybeSingle();

    if (error) {
      console.error('Error fetching course by slug:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }

    // Fetch eligible branches for this course
    let eligibleBranches: string[] = ['ALL'];
    try {
      const { data: branchMappings } = await supabaseAdmin
        .from('course_branch_mappings')
        .select('academic_branches(code, branch_code, name, branch_name)')
        .eq('course_id', course.id);

      if (branchMappings && branchMappings.length > 0) {
        eligibleBranches = branchMappings
          .map((m: any) => m.academic_branches?.code || m.academic_branches?.branch_code || m.academic_branches?.name)
          .filter(Boolean);
      }
    } catch (bErr) {
      console.warn('Branch mappings query notice:', bErr);
    }

    const sections = (course.course_sections || []).sort(
      (a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)
    );

    sections.forEach((sec: any) => {
      if (Array.isArray(sec.lessons)) {
        sec.lessons.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
      }
    });

    const totalLessons = sections.reduce(
      (acc: number, s: any) => acc + (s.lessons ? s.lessons.length : 0),
      0
    );

    const instructorName =
      course.primary_instructor?.full_name ||
      course.instructor?.name ||
      'Sarvonaya Faculty';

    const instructorBio =
      course.primary_instructor?.bio ||
      'Senior Academic Faculty';

    const normalizedCourse = {
      ...course,
      instructor: {
        name: instructorName,
        bio: instructorBio,
        avatar: course.primary_instructor?.avatar_url || null,
      },
      category: course.category?.name || 'General Engineering',
      level: course.difficulty_level || 'All Levels',
      duration: `${course.duration_hours || 10} hours`,
      rating: Number(course.average_rating) || 4.8,
      reviews: course.reviews_count ? `${course.reviews_count}` : '128',
      eligibleBranches: eligibleBranches.length > 0 ? eligibleBranches : ['CSE', 'AIML', 'ECE'],
      sections: sections.map((s: any) => ({
        id: s.id,
        title: s.title,
        lessons: (s.lessons || []).map((l: any) => ({
          id: l.id,
          title: l.title,
          duration: l.duration_minutes ? `${l.duration_minutes}m` : '15m',
          durationSeconds: l.duration_seconds || 900,
          isPreview: l.is_preview || false,
          playbackId: l.mux_playback_id || null,
        })),
      })),
      totalLessons,
      price: Number(course.price) || 0,
      originalPrice: course.discount_price ? Number(course.discount_price) : undefined,
    };

    return NextResponse.json(
      {
        success: true,
        data: normalizedCourse,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (err) {
    console.error('Course by slug API error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
