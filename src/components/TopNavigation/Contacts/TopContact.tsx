import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

interface TopContactProps {
  value: string
  type: string
}

export default function TopContact({ value, type }: TopContactProps) {
  switch (type) {
    case 'phone':
      return (
        <div className="flex flex-row w-auto gap-2.5 justify-center items-center">
          <div>
            <FontAwesomeIcon icon={faPhone} size="2xl" />
          </div>
          <span>{value}</span>
        </div>
      )
    case 'email':
      return (
        <div className="flex flex-row w-auto gap-2.5 justify-center items-center">
          <div>
            <FontAwesomeIcon icon={faPaperPlane} size="2xl" />
          </div>
          <span>{value}</span>
        </div>
      )
  }
}
