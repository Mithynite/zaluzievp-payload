'use client'

import BlockTitle from '@/components/ui/BlockTItle'
import { SingleBlock } from '@/lib/types/blocks'

// Extract just the properties for the Block
export default function CardWithDescription(
  data: Extract<SingleBlock, { blockType: 'cardsWithDescriptionBlock' }>,
) {
  const title = data.title
  const tag = data.tag

  return (
    <section id={tag}>
      <BlockTitle title={title} />
    </section>
  )
}
