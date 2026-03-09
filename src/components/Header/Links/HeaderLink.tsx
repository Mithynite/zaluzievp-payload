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
    <Link href={href} onClick={handleClick} className="">
      {title}
    </Link>
  )
}
