'use client'

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

export default function SSOCallbackPage() {
  return (
    <div className="min-h-screen bg-[#f5f8fc] flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#dfa32b] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-bold text-[#092347]">Completing secure sign-in...</p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  )
}

