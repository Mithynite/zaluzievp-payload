'use client'
import { cn } from '@/utils/ui'
import { ClassValue } from 'clsx'

interface IBlockTitleProps {
  title: string
  classNames?: {
    marker: ClassValue[]
    title: ClassValue[]
  }
}

export default function BlockTitle({ title, classNames }: IBlockTitleProps) {
  return (
    <div className="w-auto h-18 flex flex-row gap-3 items-center">
      <div className={cn('w-1 h-[60%] tablet:w-2 tablet:h-full bg-skin', classNames?.marker)}></div>
      <h1
        className={cn(
          'text-gray text-3xl tablet:text-4xl laptop:text-5xl font-semibold uppercase',
          classNames?.title,
        )}
      >
        {title}
      </h1>
    </div>
  )
}
