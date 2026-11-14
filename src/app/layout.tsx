import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SARYONAYA — Premium Online Learning & EdTech Platform',
  description: 'Learn anytime, anywhere with expert-led engineering & technology masterclasses, hands-on projects, and verifiable credentials.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className={`${plusJakartaSans.className} antialiased bg-[#F4F7FC] text-[#102B50]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}