export const dynamic = 'force-dynamic';
// SARYONAYA Customer Portal - Dynamic Homepage Hero Banners API
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { HeroBanner } from '@/types/database';

export async function GET() {
  try {
    // 1. Fetch active hero banners from primary 'banners' table
    try {
      const { data, error } = await supabaseAdmin
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        const normalized: HeroBanner[] = data.map((b: any) => ({
          id: b.id,
          title: b.title || 'Learn Anytime, Anywhere',
          subtitle: b.subtitle || 'Upgrade your skills with expert-led online courses and take your career to the next level.',
          image_url: b.image_url || '/images/mockup/hero-student-3d.png',
          mobile_image_url: b.mobile_image_url || '/images/mockup/hero-mobile-banner-2x.png',
          button_text: b.button_text || 'Explore Courses',
          button_link: b.button_link || '/courses',
          is_active: b.is_active ?? true,
          display_order: Number(b.display_order) || 1,
          created_at: b.created_at || new Date().toISOString(),
          updated_at: b.updated_at || new Date().toISOString(),
        }));

        return NextResponse.json(
          {
            success: true,
            source: 'supabase_banners',
            data: normalized,
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
            },
          }
        );
      }
    } catch (bannerTableErr) {
      console.warn('Customer API banners table query notice:', bannerTableErr);
    }

    // 2. Fallback to promotional_banners table
    try {
      const { data: promoData, error: promoError } = await supabaseAdmin
        .from('promotional_banners')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!promoError && Array.isArray(promoData) && promoData.length > 0) {
        const normalized: HeroBanner[] = promoData.map((b: any) => ({
          id: b.id,
          title: b.title || 'Learn Anytime, Anywhere',
          subtitle: b.description || b.callout_text || '',
          image_url: b.image_url || '/images/mockup/hero-student-3d.png',
          mobile_image_url: b.mobile_image_url || '/images/mockup/hero-mobile-banner-2x.png',
          button_text: b.cta_text || 'Explore Courses',
          button_link: b.cta_url || '/courses',
          is_active: b.is_active ?? true,
          display_order: Number(b.display_order) || 1,
          created_at: b.created_at || new Date().toISOString(),
          updated_at: b.updated_at || new Date().toISOString(),
        }));

        return NextResponse.json({
          success: true,
          source: 'supabase_promotional_banners',
          data: normalized,
        });
      }
    } catch (promoErr) {
      console.warn('Customer API promotional_banners query notice:', promoErr);
    }

    // 3. Fallback to Admin Portal API
    try {
      const adminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://admin-saronya.vercel.app';
      const adminRes = await fetch(`${adminUrl}/api/banners`, { cache: 'no-store' });
      if (adminRes.ok) {
        const adminJson = await adminRes.json();
        if (adminJson.success && Array.isArray(adminJson.data) && adminJson.data.length > 0) {
          return NextResponse.json({
            success: true,
            source: 'admin_api',
            data: adminJson.data,
          });
        }
      }
    } catch (adminErr) {
      console.warn('Customer API fallback to admin portal notice:', adminErr);
    }

    // 4. Default fallback hero banner to ensure homepage hero is never broken
    const defaultHero: HeroBanner[] = [
      {
        id: 'default-hero-banner',
        title: 'Learn Anytime, Anywhere',
        subtitle: 'Upgrade your skills with expert-led online courses and take your career to the next level.',
        image_url: '/images/mockup/hero-student-3d.png',
        mobile_image_url: '/images/mockup/hero-mobile-banner-2x.png',
        button_text: 'Explore Courses',
        button_link: '/courses',
        is_active: true,
        display_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      success: true,
      source: 'default_fallback',
      data: defaultHero,
    });
  } catch (err) {
    console.error('Customer Banners API Error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error', data: [] }, { status: 500 });
  }
}
