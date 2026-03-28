import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'

interface SocialLinkProps {
  link: string
  type: string
}

export default function SocialLink({ link, type }: SocialLinkProps) {
  switch (type) {
    case 'instagram':
      return (
        <Link
          href={link}
          className="text-white w-10 h-10 text-center flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Link>
      )
    case 'facebook':
      return (
        <Link
          href={link}
          className="text-white w-10 h-10 text-center flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </Link>
      )
    case 'twitter':
      return (
        <Link
          href={link}
          className="text-white w-10 h-10 text-center flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faXTwitter} size="2x" />
        </Link>
      )
    case 'youtube':
      return (
        <Link
          href={link}
          className="text-white w-10 h-10 text-center flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </Link>
      )
    default:
      return null
  }
}
