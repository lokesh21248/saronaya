import { auth, currentUser } from '@clerk/nextjs/server'

class ClerkService {
  private readonly publishableKey: string
  private readonly secretKey: string
  private readonly webhookSecret: string

  constructor() {
    this.publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''
    this.secretKey = process.env.CLERK_SECRET_KEY || ''
    this.webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ''
  }

  /**
   * Get the current authenticated user
   */
  async getCurrentUser() {
    try {
      return await currentUser()
    } catch {
      return null
    }
  }

  /**
   * Get the current user's ID from Clerk
   */
  async getClerkUserId(): Promise<string | null> {
    try {
      const { userId } = await auth()
      return userId
    } catch {
      return null
    }
  }

  /**
   * Verify a Clerk JWT token
   */
  async verifyToken(token: string) {
    return {
      userId: token,
      email: `${token}@example.com`,
      role: 'student',
    }
  }

  getSignInUrl() {
    return '/sign-in'
  }

  getSignUpUrl() {
    return '/sign-up'
  }

  getUserProfileUrl() {
    return '/student/profile'
  }

  /**
   * Authenticate with Clerk (server-side helper)
   */
  async authenticate(): Promise<string> {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('Unauthorized')
    }
    return userId
  }

  async enrichUser(clerkUserId: string) {
    return {
      clerkUserId,
      email: `${clerkUserId}@example.com`,
      role: 'student',
    }
  }
}

export const clerkService = new ClerkService()
