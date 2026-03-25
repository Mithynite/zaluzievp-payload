import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'

interface TopContactProps {
  value: string
  type: string
}

export default function TopContact({ value, type }: TopContactProps) {
  let contactComponent
  let href

  switch (type) {
    case 'phone':
      href = 'tel:' + value
      contactComponent = <FontAwesomeIcon icon={faPhone} className="text-2xl tablet:text-3xl" />
      break
    case 'email':
      href = 'mailto:' + value
      contactComponent = (
        <FontAwesomeIcon icon={faPaperPlane} className="text-2xl tablet:text-3xl" />
      )
      break
    default:
      return <></>
  }
  return (
    <div className="flex flex-row w-auto gap-2.5 justify-center items-center font-semibold flex-1">
      <div>{contactComponent}</div>
      <Link href={href} className="text-[15px] tablet:text-xl">
        {value}
      </Link>
    </div>
  )
}
