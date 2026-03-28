'use client'
import { cn } from '@/utils/ui'

interface ITitleProps {
  title: string
  classNameContainer?: string
  classNameMarker?: string
  classNameTitle?: string
}

export default function Title({ title, classNameContainer, classNameMarker, classNameTitle }: ITitleProps) {
  return (
    // 1. Changed strict 'h-18' to a 'min-h-[4.5rem]' (which equals 72px) so it can grow if the title wraps to two lines
    <div className={cn("w-auto min-h-[4.5rem] flex flex-row gap-3 items-center py-2 tablet:h-20", classNameContainer)}>
      {/* Added min-h to the marker so it doesn't disappear if the container grows */}
      <div className={cn('w-1 min-h-[2.5rem] tablet:w-2 tablet:h-full self-stretch bg-skin', classNameMarker)}></div>
      <h1
        className={cn(
          'text-gray font-semibold uppercase',
          // 2. Fluid typography for mobile: scales smoothly between 1.5rem and 2.25rem based on screen width
          'text-[clamp(1.5rem,5vw,2.25rem)] tablet:text-4xl laptop:text-5xl',
          // 3. Ensures line height stays tight if it wraps, and breaks extremely long words instead of overflowing
          'leading-tight break-words',
          classNameTitle,
        )}
      >
        {title}
      </h1>
    </div>
  )
}

export function SmallerTitle({ title, classNameContainer, classNameMarker, classNameTitle }: ITitleProps) {
  return (
    <div className={cn("w-auto h-18 flex flex-row gap-3 items-center", classNameContainer)}>
      <div className={cn('w-1 h-[60%] tablet:w-2 tablet:h-full bg-skin', classNameMarker)}></div>
      <h1
        className={cn(
          'text-gray text-3xl tablet:text-4xl laptop:text-5xl font-semibold uppercase',
          classNameTitle,
        )}
      >
        {title}
      </h1>
    </div>
  )
}
