import BlockTitle from '@/components/ui/BlockTItle'
import { SingleBlock } from '@/lib/types/blocks'

export default function FormBlock(data: Extract<SingleBlock, { blockType: 'formBlock' }>) {
  const title = data.title
  const tag = data.tag
  const form = data.form

  return (
    <section id={tag} className="w-full h-auto flex flex-col gap-5 tablet:gap-7 laptop:gap-10">
      <BlockTitle title={title} />
      {typeof form === 'object' && form.fields.length > 0 
        ? form.fields.map((field, index) => 
            
        )
        : null
      }
    </section>
  )
}
