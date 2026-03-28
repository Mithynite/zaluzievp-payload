'use client'

import Title from '@/components/ui/Title'
import { SingleBlock } from '@/lib/types/SingleBlocks'
import CardWithTitle from './CardsWithTitle'

// Extract just the properties for the Block
export default function CardsWithTitleBlock(
  data: Extract<SingleBlock, { blockType: 'cardsWithTitleBlock' }>,
) {
  const title = data.title
  const cards = data.cards ?? []
  const textToPage = data.textToPage ?? ''

  return (
    <>
      <Title title={title} />
      <div className="flex flex-row flex-wrap px-4 gap-7 tablet:justify-normal tablet:px-6 tablet:gap-5 laptop:gap-x-[5%] laptop:gap-y-8">
        {cards.length > 0
          ? cards.map((card) => (
              <CardWithTitle
                key={card.id}
                title={card.title}
                subtitle={card.subTitle}
                image={card.image}
                toPage={card.toPage}
                textToPage={textToPage}
              />
            ))
          : null}
      </div>
    </>
  )
}
