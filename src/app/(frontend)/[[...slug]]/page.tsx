import BlockWrapper from '@/components/Blocks/BlockWrapper'
import getPage from '@/lib/pages/getPage'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const parameters = await params
  const slugArray = parameters.slug || []
  const page = await getPage(slugArray)

  if (!page) return { title: 'Stránka nenalezena' }

  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description,
    // ... openGraph and other meta tags
  }
}

export default async function DynamicPage({ params }: Args) {
  const parameters = await params

  const slugArray = parameters.slug || []

  const page = await getPage(slugArray)

  if (!page) return notFound()

  const blocks = page.blocks ?? []

  return (
    <main className="container mx-auto p-8 flex flex-col gap-5">
      {blocks.length > 0 ? (
        <>
          {blocks.map((block) => (
            <BlockWrapper key={block.id} {...block} />
          ))}
        </>
      ) : null}
    </main>
  )
}
