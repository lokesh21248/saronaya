export const dynamic = 'force-dynamic';
// SARYONAYA Customer Portal - Promotional Banners API (Zero dummy data)
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

    // 2. Fallback to direct admin portal API if DB query was empty
    try {
      const adminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://admin-saronya.vercel.app';
      const adminRes = await fetch(`${adminUrl}/api/banners`, { cache: 'no-store' });
      if (adminRes.ok) {
        const adminJson = await adminRes.json();
        if (adminJson.success && Array.isArray(adminJson.data)) {
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

    // 3. Return clean empty data if no banners exist
    return NextResponse.json({
      success: true,
      source: 'empty',
      data: [],
    });
  } catch (err) {
    console.error('Customer Banners API Error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error', data: [] }, { status: 500 });
  }
}
