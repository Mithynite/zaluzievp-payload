import BlockWrapper from '@/components/Blocks/BlockWrapper'
import getPage from '@/lib/pages/getPage'
import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function DynamicPage({ params }: Args) {
  const parameters = await params

  const slugArray = parameters.slug || []

  const page = await getPage(slugArray)

  if (!page) return notFound()

  const blocks = page.blocks ?? []

  return (
    <main className="container mx-auto p-8">
      {blocks.length > 0 ? (
        <>
          {blocks.map((block, index) => (
            <BlockWrapper key={block.id} {...block} />
          ))}
        </>
      ) : null}
    </main>
  )
}
