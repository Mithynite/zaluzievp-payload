'use server'

import { SingleBlock } from '@/lib/types/blocks'
import { Page } from '@/payload-types'
import CardsWithDescription from './CardWithDescription/CardsWithDescription'

export default async function BlockWrapper(block: SingleBlock) {
  const blockType = block.blockType

  switch (blockType) {
    case 'cardsWithDescriptionBlock':
      return <CardsWithDescription {...block} />
    case 'formBlock':
      return null
  }
}
