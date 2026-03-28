'use client'

import Title from '@/components/ui/Title'
import { SingleBlock } from '@/lib/types/SingleBlocks'
import CardWithDescription from './CardWithDescription'

// Extract just the properties for the Block
export default function CardsWithDescriptionBlock(
  data: Extract<SingleBlock, { blockType: 'cardsWithDescriptionBlock' }>,
) {
  const title = data.title

  const cards = data.cards ?? []
  // className="flex flex-row flex-wrap justify-center gap-7 tablet:justify-normal tablet:px-6 tablet:gap-5 laptop:gap-x-[5%] laptop:gap-y-8"
  return (
    <>
      <Title title={title} />
      <div className="flex flex-row flex-wrap px-4 gap-7 tablet:justify-normal tablet:px-6 tablet:gap-5 laptop:gap-x-[5%] laptop:gap-y-8">
        {cards.length > 0
          ? cards.map((card) => (
              <CardWithDescription
                key={card.id}
                image={card.image}
                title={card.title}
                description={card.description}
              />
            ))
          : null}
      </div>
    </>
  )
}
