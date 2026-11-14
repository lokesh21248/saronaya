import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const trimmedEmail = (email || '').trim().toLowerCase()

    if (!trimmedEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const clerkSecret = process.env.CLERK_SECRET_KEY

    if (!clerkSecret) {
      return NextResponse.json({ error: 'Clerk Secret Key is not configured' }, { status: 500 })
    }

    // 1. Check if user already exists in Clerk
    let userId: string | null = null

    try {
      const listRes = await fetch(
        `https://api.clerk.com/v1/users?email_address=${encodeURIComponent(trimmedEmail)}`,
        {
          headers: {
            Authorization: `Bearer ${clerkSecret}`,
          },
        }
      )

      if (listRes.ok) {
        const users = await listRes.json()
        if (Array.isArray(users) && users.length > 0) {
          userId = users[0].id
        }
      }
    } catch (e) {
      console.warn('Error querying Clerk user:', e)
    }

    // 2. If user doesn't exist, create them in Clerk
    if (!userId) {
      const namePart = trimmedEmail.split('@')[0] || 'Student'
      const capitalizedFirst = namePart.charAt(0).toUpperCase() + namePart.slice(1)

      const createRes = await fetch('https://api.clerk.com/v1/users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${clerkSecret}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: [trimmedEmail],
          password: password || 'Saryonaya@2026!',
          first_name: capitalizedFirst,
          last_name: 'Student',
          skip_password_checks: true,
        }),
      })

      if (createRes.ok) {
        const newUser = await createRes.json()
        userId = newUser.id
      } else {
        const errData = await createRes.json()
        console.error('Clerk user creation response:', errData)
      }
    }

    // 3. Generate a sign-in token (ticket) for this user in Clerk
    if (userId) {
      const tokenRes = await fetch('https://api.clerk.com/v1/sign_in_tokens', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${clerkSecret}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          expires_in_seconds: 300,
        }),
      })

      if (tokenRes.ok) {
        const tokenData = await tokenRes.json()
        return NextResponse.json({
          success: true,
          token: tokenData.token,
          email: trimmedEmail,
          userId,
        })
      }
    }

    return NextResponse.json(
      { error: 'Could not generate sign-in session with Clerk' },
      { status: 500 }
    )
  } catch (error: any) {
    console.error('Sign-in API error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
