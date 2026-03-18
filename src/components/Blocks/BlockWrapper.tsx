'use server'

import { SingleBlock } from '@/lib/types/blocks'
import { Page } from '@/payload-types'
import CardsWithDescriptionBlock from './CardsWithDescription/CardsWithDescriptionBlock'

export default async function BlockWrapper(block: SingleBlock) {
  const blockType = block.blockType

  switch (blockType) {
    case 'cardsWithDescriptionBlock':
      return <CardsWithDescriptionBlock {...block} />
    case 'formBlock':
      return null
  }
}
