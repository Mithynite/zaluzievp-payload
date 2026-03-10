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

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-black text-4xl font-bold">{page.title}</h1>
    </main>
  )
}
