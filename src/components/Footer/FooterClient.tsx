'use client'

import { Footer } from '@/payload-types'
import Link from 'next/link'
import SocialLink from './Links/SocialLink'
import Separator from '../ui/Separator'

export default function FooterClient(props: Footer) {
  const title = props.title
  const description = props.description ?? ''

  const contacts = props.contacts
  const socialLinks = props.followLinks ?? []
  const otherLinks = props.links ?? []

  const subfooter = props.subfooter

  // [year]
  function formatCopyright(base: string) {
    const year = new Date().getFullYear()
    const result = base.replace('[year]', year.toString())
    return <p>{result}</p>
  }

  return (
    <footer className="flex flex-col w-full min-h-96 text-white bg-gray mt-auto">
      <div className="border-box w-full flex flex-col gap-y-10 flex-5 bg-gray px-8 py-10 tablet:flex-row tablet:gap-x-4 tablet:px-4 laptop:gap-x-20 laptop:px-16">
        <div className="flex flex-col gap-5 tablet:gap-2">
          <div className="flex flex-col gap-6 flex-5">
            <h1 className="text-xl tablet:text-2xl font-bold">
              <Link href="/">{title}</Link>
            </h1>
            <p className="text-gray-400 font-light">{description}</p>
          </div>

          {contacts ? (
            <div className="flex flex-col flex-2 justify-evenly font-semibold">
              {contacts.map((contact, index) => {
                const value = contact.value
                const type = contact.type // TODO: add purpose

                return <span key={value + type + index}>{value}</span>
              })}
            </div>
          ) : null}
        </div>

        {socialLinks.length > 0 ? (
          <>
            <Separator />
            <div className="flex flex-col h-full w-auto gap-5 min-w-46">
              <h1 className="text-xl font-semibold">Sledujte nás</h1>
              <div className="grid grid-cols-2 gap-4 max-w-24.5">
                {socialLinks.map((l, index) => {
                  const id = l.id
                  const link = l.link
                  const type = l.type

                  return <SocialLink key={id} link={link} type={type} />
                })}
              </div>
            </div>
          </>
        ) : null}

        {otherLinks.length > 0 ? (
          <>
            <Separator />
            <div className="flex flex-col h-full w-auto gap-5 min-w-46">
              <h1 className="text-xl font-semibold">Další odkazy</h1>
              <div className="flex flex-col gap-4 font-light">
                {otherLinks.map((l, index) => {
                  const id = l.id
                  const title = l.title
                  const link = l.link

                  return (
                    <Link key={id} href={link}>
                      {title}
                    </Link>
                  )
                })}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="w-full flex flex-row justify-between items-center p flex-1 bg-dimmed px-4 tablet:px-8 py-2.5 text-gray-400 font-light text-xs tablet:text-[16px]">
        {subfooter?.rights ? formatCopyright(subfooter.rights) : <p></p>}
        <p>{subfooter?.author ? 'Author ' + subfooter.author : null}</p>
      </div>
    </footer>
  )
}
