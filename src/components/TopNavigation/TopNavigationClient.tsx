'use client'

import { TopNavigation } from '@/payload-types'
import TopContact from './Contacts/TopContact'

export default function TopNavigationClient(props: TopNavigation) {
  const contacts = props.contacts ?? []
  return (
    <div className="flex flex-row justify-center sticky bg-skin w-full h-18">
      <div className="w-[80%] flex flex-row justify-evenly">
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
