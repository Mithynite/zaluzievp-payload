import getPage from '@/lib/pages/getPage'
import { notFound } from 'next/navigation'

export default async function DynamicPage({ params }: { params: { slug?: string[] } }) {
  const parameters = await params
  const page = await getPage(parameters.slug) // something/else/done

  if (!page) return notFound()

  return (
    <main>
      <h1 className="text-black text-4xl">{page.title}</h1>
    </main>
  )
}
