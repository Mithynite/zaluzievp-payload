'use client'

import { useState } from 'react'
import Title, { SmallerTitle } from '@/components/ui/Title'
import { SingleBlock } from '@/lib/types/SingleBlocks'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs, faScrewdriverWrench, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

export default function ReferenceDetailsBlock(
  data: Extract<SingleBlock, { blockType: "referenceDetailsBlock" }>,
) {
  const title = data.title
  const information = data.information
  const description = data.description
  const images = data.images

  function formatDate(dateInput?: string | Date | null) {
    if (!dateInput) return ''

    const date = new Date(dateInput)

    // Fallback if the date is invalid
    if (isNaN(date.getTime())) return ''

    return new Intl.DateTimeFormat('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  // Track the full-size URL of the clicked image. Null means the modal is closed.
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <Title title={title} />
      <div className="w-full h-auto flex flex-col px-3 gap-7 tablet:px-5 tablet:gap-5 laptop:gap-8">
        <div className='flex flex-row flex-wrap w-full gap-7 laptop:min-h-96'>
            <div className='flex flex-col justify-evenly flex-1 bg-simple-bg p-8 gap-3 min-w-[280px]'>
                {/**Info */}
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-row items-center gap-3'>
                    <FontAwesomeIcon icon={faLocationCrosshairs} className='text-pretanned text-2xl tablet:text-3xl laptop:text-4xl'/>
                    <h1 className='font-semibold text-2xl tablet:text-3xl laptop:text-3xl'>Lokace</h1>
                  </div>
                  <p className='ml-10 tablet:ml-12 laptop:ml-14 laptop:text-[18px]'>{information.location}</p>
                </div>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-row items-center gap-3'>
                    <FontAwesomeIcon icon={faScrewdriverWrench} className='text-tanned text-2xl tablet:text-3xl laptop:text-4xl'/>
                    <h1 className='font-semibold text-2xl tablet:text-3xl laptop:text-3xl'>Služby</h1>
                  </div>
                  <p className='ml-10 tablet:ml-12 laptop:ml-14 laptop:text-[18px]'>{information.services}</p>
                </div>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-row items-center gap-3'>
                    <FontAwesomeIcon icon={faCalendar} className='text-rot text-2xl tablet:text-3xl laptop:text-4xl'/>
                    <h1 className='font-semibold text-2xl tablet:text-3xl laptop:text-3xl'>Datum</h1>
                  </div>
                  <p className='ml-10 tablet:ml-12 laptop:ml-14 laptop:text-[18px]'>{formatDate(information.date)}</p>
                </div>
                
            </div>
            <div className='flex flex-2 flex-col bg-simple-bg p-8 gap-3 min-w-[280px]'>
                {/**Description */}
                <SmallerTitle title="Popis" 
                    classNameContainer='w-auto h-12 flex flex-row gap-3 items-center'
                    classNameMarker='w-1 h-[60%] tablet:w-1.5 tablet:h-full bg-skin'
                    classNameTitle='text-xl tablet:text-2xl laptop:text-3xl'
                />
                {description && <RichText data={description} className='px-3 tablet:px-5 laptop:text-[18px]'/>}
            </div>            
        </div>
        
        {/** Image Gallery */}
        {images && images.length > 0 && (
          <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
              {images.map((img, index) => {
                const thumbUrl =
                  typeof img === 'object' && img?.sizes?.square?.url
                    ? img.sizes.square.url
                    : '/api/media/file/Default%20image.png'
                
                // Get the original, full-size image for the modal
                const fullUrl = 
                  typeof img === 'object' && img?.url 
                    ? img.url 
                    : thumbUrl
  
                const altText = typeof img === 'object' && img.alt ? img.alt : 'default'
                const imgKey = typeof img === 'object' && img.id ? img.id : index

                return(
                  <div 
                    key={imgKey} 
                    // Added cursor-pointer and onClick handler
                    className='relative w-full aspect-square overflow-hidden shadow-md group cursor-pointer'
                    onClick={() => setSelectedImage(fullUrl)}
                  >
                    <Image 
                      src={thumbUrl} 
                      alt={altText} 
                      fill 
                      className="object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                  </div>
                )
              })}
          </div>
        )}
      </div>

      {/** Full-Screen Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 tablet:p-8"
          onClick={() => setSelectedImage(null)} // Close when clicking the background
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 tablet:top-8 tablet:right-8 text-white text-3xl tablet:text-4xl hover:text-gray-300 z-50 transition-all cursor-pointer hover:scale-110"
            onClick={(e) => {
              e.stopPropagation() // Prevent triggering the background click
              setSelectedImage(null)
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          {/* The full-size image */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={selectedImage} 
              alt="Fullscreen view" 
              fill
              className="object-contain" 
            />
          </div>
        </div>
      )}
    </>
  )
}