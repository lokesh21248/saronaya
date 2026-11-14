export type Role = 'student' | 'instructor' | 'admin' | 'support'

export interface User {
  id: string
  clerkUserId: string
  email: string
  fullName: string
  phone: string | null
  avatarUrl: string | null
  role: Role
  status: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UserRole {
  id: string
  userId: string
  role: Role
  department: string | null
  permissions: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface UserSession {
  userId: string
  clerkUserId: string | null
  role: Role
  isAuthenticated: boolean
  expiresAt: string
}

export type Permission =
  | 'read:self'
  | 'write:self'
  | 'read:admin'
  | 'write:admin'
  | 'read:courses'
  | 'write:courses'
  | 'read:students'
  | 'write:students'
  | 'read:payments'
  | 'write:payments'
  | 'read:video'
  | 'write:video'
  | 'manage:certificates'
  | 'manage:quizzes'
  | 'manage:assignments'

export interface UserPermissions {
  [key: string]: boolean
}

export interface AuthResult {
  success: boolean
  user?: User
  token?: string
  error?: string
}

export interface ClerkUser {
  id: string
  emailAddresses: Array<{
    emailAddress: string
    verification: { status: string }
  }>
  firstName: string | null
  lastName: string | null
  imageUrl: string | null
  primaryEmailAddress: string
}
