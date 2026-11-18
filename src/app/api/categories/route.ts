export const dynamic = 'force-dynamic';
// SARYONAYA Customer Portal - Categories API
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET() {
  try {
    // 1. Fetch active categories directly from Supabase
    try {
      const { data, error } = await supabaseAdmin
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        return NextResponse.json(
          {
            success: true,
            source: 'supabase_categories',
            total: data.length,
            data,
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
            },
          }
        );
      }
    } catch (dbErr) {
      console.warn('Customer API categories DB notice:', dbErr);
    }

    // 2. Fallback to Admin Portal API
    try {
      const adminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://admin-saronya.vercel.app';
      const adminRes = await fetch(`${adminUrl}/api/categories`, { cache: 'no-store' });
      if (adminRes.ok) {
        const adminJson = await adminRes.json();
        if (adminJson.success && Array.isArray(adminJson.data) && adminJson.data.length > 0) {
          return NextResponse.json({
            success: true,
            source: 'admin_api',
            total: adminJson.data.length,
            data: adminJson.data,
          });
        }
      }
    } catch (adminErr) {
      console.warn('Customer API fallback to admin categories notice:', adminErr);
    }

    // 3. Fallback default categories if database is empty
    const defaultCategories = [
      { id: 'c1', name: 'Programming', slug: 'programming', description: 'Code • Build • Innovate', icon: 'Code2', display_order: 1 },
      { id: 'c2', name: 'Data Science', slug: 'datascience', description: 'Analyze • Predict • Grow', icon: 'BarChart3', display_order: 2 },
      { id: 'c3', name: 'Design', slug: 'design', description: 'Create • Inspire • Design', icon: 'Layers', display_order: 3 },
      { id: 'c4', name: 'Business', slug: 'business', description: 'Plan • Grow • Succeed', icon: 'Briefcase', display_order: 4 },
    ];

    return NextResponse.json({
      success: true,
      source: 'default_fallback',
      total: defaultCategories.length,
      data: defaultCategories,
    });
  } catch (err) {
    console.error('Customer Categories API Error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error', data: [] }, { status: 500 });
  }
}
