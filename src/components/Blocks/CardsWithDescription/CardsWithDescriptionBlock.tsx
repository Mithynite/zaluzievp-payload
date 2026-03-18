'use client'

import BlockTitle from '@/components/ui/BlockTItle'
import { SingleBlock } from '@/lib/types/blocks'
import CardWithDescription from './CardsWithDescription'

// Extract just the properties for the Block
export default function CardWithDescriptionBlock(
  data: Extract<SingleBlock, { blockType: 'cardsWithDescriptionBlock' }>,
) {
  const title = data.title
  const tag = data.tag

  const cards = data.cards ?? []

  return (
    <section id={tag} className="w-full h-auto flex flex-col gap-5 tablet:gap-7 laptop:gap-10">
      <BlockTitle title={title} />
      <div className="flex flex-row flex-wrap justify-center gap-7 tablet:justify-normal tablet:px-6 tablet:gap-5 laptop:gap-[10%]">
        {cards.length > 0
          ? cards.map((card, index) => (
              <CardWithDescription
                key={card.id}
                image={card.image}
                title={card.title}
                description={card.description}
              />
            ))
          : null}
      </div>
    </section>
  )
}
