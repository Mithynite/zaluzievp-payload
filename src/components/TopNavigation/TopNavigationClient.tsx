'use client'

import { TopNavigation } from '@/payload-types'
import TopContact from './Contacts/TopContact'

export default function TopNavigationClient(props: TopNavigation) {
  const contacts = props.contacts ?? []
  return (
    <div className="flex flex-row justify-center sticky bg-skin w-full h-28 tablet:h-18">
      <div className="max-w-[230px] tablet:max-w-full w-[80%] flex flex-col gap-4 tablet:flex-row justify-evenly">
        {contacts.map((contact, index) => {
          return (
            <TopContact
              key={index + contact.type + contact.id}
              value={contact.value}
              type={contact.type}
            />
          )
        })}
      </div>
    </div>
  )
}
