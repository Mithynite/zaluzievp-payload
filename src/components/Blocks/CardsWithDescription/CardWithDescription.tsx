'use client'

import { useState } from 'react'
import Image from 'next/image'
import CardTitle from '@/components/ui/CardTitle'
import { Media } from '@/payload-types'
import { cn } from '@/utils/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons' // Standard icon name

interface ICardWithDescriptionProps {
  title: string
  image?: Media | number | null
  description?: string | null // lowercase 'string' is preferred in TS
}

export default function CardWithDescription({
  image,
  title,
  description,
}: ICardWithDescriptionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleOpening() {
    if (typeof window != undefined && window.innerWidth >= 1024) setIsOpen(true)
  }

  // Standardizing the Image URL logic
  const imageUrl =
    typeof image === 'object' && image?.sizes?.square?.url
      ? image.sizes.square.url
      : '/api/media/file/Default%20image.png'

  const altText = typeof image === 'object' && image?.alt ? image.alt : 'default'

  return (
    <>
      <article
        className="w-full max-w-sm shadow-2xl flex flex-col cursor-pointer transition-transform tablet:max-w-lg laptop:tablet:max-w-100 laptop:hover:scale-[1.01]"
        onClick={handleOpening}
      >
        <div className="relative w-full aspect-video">
          <Image src={imageUrl} alt={altText} fill className="object-cover" />
        </div>
        <div className="p-4">
          <CardTitle title={title} classNames={{ marker: [], title: ['laptop:truncate'] }} />
          <p className="text-gray-600 mt-2 text-sm px-5 laptop:line-clamp-5">{description}</p>
        </div>
      </article>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <button
            className="absolute top-6 right-6 text-white cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faXmark} size="2xl" />
          </button>

          {/* Expanded Content Card */}
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl">
            <div className="relative w-full aspect-video">
              <Image src={imageUrl} alt={altText} fill className="object-cover" />
            </div>
            <div className="p-8">
              <CardTitle title={title} />
              <div className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line px-5">
                {description}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
