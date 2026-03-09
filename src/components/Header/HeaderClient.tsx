'use client'
import { Header } from '@/payload-types'
import HeaderLink from './Links/HeaderLink'

export default function HeaderClient(props: Header) {
  const title = props.title
  const links = props.links ?? []

  return (
    <div className="">
      {title}
      <nav>
        {links.map((link, index) => {
          return (
            <HeaderLink
              key={index + title + link.id}
              title={link.title}
              page={link.page}
              anchor={link.anchor}
            />
          )
        })}
      </nav>
      <label className="burger" htmlFor="burger">
        <input type="checkbox" id="burger" />
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  )
}
