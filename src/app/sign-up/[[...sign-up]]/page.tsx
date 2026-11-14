import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-navy-deep flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-navy-deep font-black text-lg shadow-lg group-hover:scale-105 transition-transform">
          S
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-2xl tracking-tight leading-tight">
            SARYONAYA
          </span>
          <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">
            Online Learning Platform
          </span>
        </div>
      </Link>

      <SignUp
        signInUrl="/sign-in"
        forceRedirectUrl="/onboarding"
        appearance={{
          elements: {
            rootBox: 'mx-auto w-full max-w-md',
            card: 'bg-navy border border-line/20 shadow-2xl rounded-2xl',
            headerTitle: 'text-white text-xl font-bold',
            headerSubtitle: 'text-muted text-sm',
            formButtonPrimary: 'bg-gold hover:bg-gold-light text-navy-deep font-bold transition-all',
            formFieldInput: 'bg-navy-soft/80 border-line/20 text-cream focus:border-gold',
            footerActionLink: 'text-gold hover:text-gold-light',
            dividerLine: 'bg-line/20',
            dividerText: 'text-muted text-xs',
          },
        }}
      />
    </div>
  )
}
