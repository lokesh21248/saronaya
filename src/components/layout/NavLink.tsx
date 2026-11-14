import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
}

export function NavLink({ href, children, className = '', activeClassName = 'text-gold border-gold' }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        'relative px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive ? activeClassName : 'text-muted hover:text-cream',
        className
      )}
    >
      {children}
      {isActive && (
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold rounded-full" />
      )}
    </Link>
  )
}
