'use client'

import { useState } from 'react'
import Image from 'next/image'
import CardTitle from '@/components/ui/CardTitle'
import { Media, Page } from '@/payload-types'
import { cn } from '@/utils/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons' // Standard icon name
import Link from 'next/link'

interface ICardWithTitleProps {
  title: string
  subtitle: string
  image?: Media | number | null
  toPage?: Page | number
  textToPage?: string
}

export default function CardWithTitle({
  title,
  subtitle,
  image,
  toPage,
  textToPage,
}: ICardWithTitleProps) {
  const imageUrl =
    typeof image === 'object' && image?.sizes?.square?.url
      ? image.sizes.square.url
      : '/api/media/file/default.png'

  const altText = typeof image === 'object' && image?.alt ? image.alt : 'default'
  let targetUrl = '#'
    if (typeof toPage === 'object' && toPage !== null) {
      const breadcrumbs = toPage.breadcrumbs || []
      const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]
      targetUrl = lastBreadcrumb?.url || '/'
    }
  return (
    <Link 
      href={targetUrl} 
      // Moved the sizing constraints here so the link block behaves correctly
      className="block w-full max-w-sm tablet:max-w-lg laptop:tablet:max-w-100 outline-none" 
    >
      <article className="w-full max-w-sm shadow-2xl flex flex-col cursor-pointer transition-transform tablet:max-w-lg laptop:tablet:max-w-100 laptop:hover:scale-[1.01]">
        <div className="relative w-full aspect-video">
          <Image src={imageUrl} alt={altText} fill className="object-cover" />
          <div className="flex flex-col gap-1 absolute text-white w-full h-auto p-5">
            <h1 className="text-xl tablet:text-2xl laptop:text-3xl font-semibold">{title}</h1>
            <p className="px text-sm tablet:text-xl">{subtitle}</p>
          </div>
        </div>
        <div className="h-15 bg-white flex flex-row items-center justify-between">
          <div className="h-full w-auto flex flex-row items-center gap-3">
            <div className={cn('w-1 min-h-10 bg-tanned shrink-0 tablet:w-1.5 tablet:h-full')}></div>
            <h1
              className={cn(
                'text-gray text-xl tablet:text-2xl laptop:text-3xl font-semibold',
                'flex-1 min-w-0 break-all',
              )}
            >
              {textToPage}
            </h1>
          </div>
          <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-2xl tablet:text-3xl" />
        </div>
      </article>
    </Link>
  )
}
