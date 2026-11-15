export const dynamic = 'force-dynamic';
// SARYONAYA Customer Portal - Promotional Banners API
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET() {
  try {
    // 1. Fetch active banners from Supabase database
    const { data, error } = await supabaseAdmin
      .from('promotional_banners')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return NextResponse.json({
        success: true,
        source: 'database',
        data,
      });
    }

    // 2. If database table is empty or loading, fallback to admin API
    try {
      const adminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://admin-saronya.vercel.app';
      const adminRes = await fetch(`${adminUrl}/api/banners`, { cache: 'no-store' });
      if (adminRes.ok) {
        const adminJson = await adminRes.json();
        if (adminJson.success && adminJson.data && adminJson.data.length > 0) {
          return NextResponse.json({
            success: true,
            source: 'admin_api',
            data: adminJson.data,
          });
        }
      }
    } catch (adminErr) {
      console.warn('Customer API fallback to admin portal error:', adminErr);
    }

    // 3. Fallback default banners
    return NextResponse.json({
      success: true,
      source: 'fallback',
      data: [
        {
          id: 'banner-skills',
          title: 'Upgrade Your Skills Today',
          badge_text: 'FEATURED PROGRAM',
          callout_text: '500+ Industry Modules',
          description: 'Explore industry-ready courses taught by expert instructors with real-world engineering projects.',
          cta_text: 'Explore Courses',
          cta_url: '/courses',
          background_color: '#061B3A',
          display_order: 1,
          is_active: true,
        },
        {
          id: 'banner-premium',
          title: 'Unlock Unlimited Learning',
          badge_text: 'ALL-ACCESS PASS',
          callout_text: 'Save 45% This Month',
          description: 'Get full access to all 500+ premium courses, live mentor doubt clearing, and verified certificates.',
          cta_text: 'Go Premium',
          cta_url: '/subscriptions',
          background_color: '#092653',
          display_order: 2,
          is_active: true,
        },
      ],
    });
  } catch (err) {
    console.error('Customer Banners API Error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
