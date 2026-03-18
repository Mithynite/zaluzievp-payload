'use client'
import { cn } from '@/utils/ui'
import { ClassValue } from 'clsx'

interface ICardTitleProps {
  title: string
  classNames?: {
    marker: ClassValue[]
    title: ClassValue[]
  }
}

export default function CardTitle({ title, classNames }: ICardTitleProps) {
  return (
    <div className="w-full flex flex-row gap-3 items-center py-1">
      <div
        className={cn(
          'w-1 min-h-10 bg-tanned shrink-0 tablet:w-1.5 tablet:h-full',
          classNames?.marker,
        )}
      ></div>
      <h1
        className={cn(
          'text-gray text-xl tablet:text-2xl laptop:text-3xl font-semibold',
          'flex-1 min-w-0 break-all',
          classNames?.title,
        )}
      >
        {title}
      </h1>
    </div>
  )
}
