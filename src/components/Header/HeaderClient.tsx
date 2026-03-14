'use client'
import { Header } from '@/payload-types'
import HeaderLink from './Links/HeaderLink'
import Link from 'next/link'
import { useState } from 'react'

export default function HeaderClient(props: Header) {
  const title = props.title
  const links = props.links ?? []

  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toogleHamburgerMenu() {
    setIsOpen(!isOpen)
  }

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <div className="bg-gray w-full h-20 flex flex-row text-white justify-between items-center px-10 relative z-50 font-bold">
      <h1 className="text-xl tablet:text-3xl">
        <Link href="/">{title}</Link>
      </h1>
      <nav className="w-auto hidden flex-row gap-6 tablet:flex">
        {links.map((link, index) => {
          return (
            <HeaderLink key={link.id} title={link.title} page={link.page} anchor={link.anchor} />
          )
        })}
      </nav>
      <button
        className="tablet:hidden w-10 h-7.5 flex flex-col justify-between items-center cursor-pointer z-50 relative outline-none"
        onClick={toogleHamburgerMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {/* You can apply your custom burger CSS spans here */}
        <span
          className={`block w-full h-1 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-3' : ''}`}
        ></span>
        <span
          className={`block w-full h-1 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`}
        ></span>
        <span
          className={`block w-full h-1 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-3.5' : ''}`}
        ></span>
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full w-full tablet:h-[calc(100dvh-5rem-4.5rem)] bg-gray p-10 z-40">
          <nav className="w-auto flex flex-col gap-6">
            {links.map((link) => (
              <div key={link.id} onClick={closeMenu}>
                <HeaderLink title={link.title} page={link.page} anchor={link.anchor} />
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
