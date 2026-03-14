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
        <div className="flex flex-row w-auto gap-2.5 justify-center items-center font-semibold">
          <div>
            {/* Replaced size="2xl" with responsive text classes */}
            <FontAwesomeIcon icon={faPhone} className="text-2xl tablet:text-3xl" />
          </div>
          <span className="text-[15px] tablet:text-xl">{value}</span>
        </div>
      )
    case 'email':
      return (
        <div className="flex flex-row w-auto gap-2.5 justify-center items-center font-semibold">
          <div>
            {/* Added a base size and a tablet size to your existing class */}
            <FontAwesomeIcon icon={faPaperPlane} className="text-2xl tablet:text-3xl" />
          </div>
          <span className="text-[15px] tablet:text-xl">{value}</span>
        </div>
      )
    default:
      return null
  }
}
