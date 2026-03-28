'use server'

import { SingleBlock } from '@/lib/types/SingleBlocks'
import CardsWithDescriptionBlock from './CardsWithDescription/CardsWithDescriptionBlock'
import FormBlock from './Form/FormBlock'
import CardsWithTitleBlock from './CardsWithTitle/CardsWithTitleBlock'
import ReferenceDetailsBlock from './ReferenceDetails/ReferenceDetailsBlock'

export default async function BlockWrapper(block: SingleBlock) {
  const blockType = block.blockType

  let blockComponent
  switch (blockType) {
    case 'cardsWithDescriptionBlock':
      blockComponent = <CardsWithDescriptionBlock {...block} />
      break
    case 'cardsWithTitleBlock':
      blockComponent = <CardsWithTitleBlock {...block} />
      break
    case 'formBlock':
      blockComponent = <FormBlock {...block} />
      break
    case 'referenceDetailsBlock':
      blockComponent = <ReferenceDetailsBlock {...block} />
      break
    default:
      return <></>
  }
  return (
    <section
      id={block.tag}
      className="w-full h-auto flex flex-col gap-5 tablet:gap-7 laptop:gap-10 mt-8 mb-16"
    >
      {blockComponent}
    </section>
  )
}
