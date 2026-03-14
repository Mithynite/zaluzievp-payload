import { Page } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderLinkProps {
  title: string
  page: Page | number
  anchor?: string | null
}

export default function HeaderLink({ title, page, anchor }: HeaderLinkProps) {
  const pathname = usePathname()

  if (typeof page === 'number') return null

  const targetPath = page.path
  const isCurrentPage = pathname === targetPath

  const href = anchor ? `${isCurrentPage ? '' : targetPath}#${anchor}` : targetPath

  const handleClick = (e: React.MouseEvent) => {
    // Only intercept for smooth scrolling if there is an anchor AND we are already on that page
    if (anchor && isCurrentPage) {
      e.preventDefault()
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="relative inline-block text-white cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
    >
      {title}
    </Link>
  )
}
