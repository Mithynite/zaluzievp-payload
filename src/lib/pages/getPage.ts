import { getPayload } from 'payload'
import config from '@payload-config'

export default async function getPage(slugArray: string[]) {
  // 1. Reconstruct the full path
  const fullPath =
    slugArray.length === 0 || (slugArray.length === 1 && slugArray[0] === 'index')
      ? '/'
      : `/${slugArray.join('/')}`

  // 2. Get just the CURRENT slug (the last part of the URL)
  // If the array is empty, we assume they are looking for the 'index' slug
  const currentSlug = slugArray.length > 0 ? slugArray[slugArray.length - 1] : 'index'

  const payload = await getPayload({ config })

  // 3. Query the database using the exact slug
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: currentSlug,
      },
    },
    // If you use Drafts/Versions, uncomment the line below to test in dev mode:
    // draft: true,
  })

  if (!docs || docs.length === 0) return null

  // 4. In case multiple pages have the same slug (e.g., /services/about and /company/about),
  // we filter the results to find the exact one where the LAST breadcrumb matches our full path.
  const exactPage = docs.find((doc) => {
    // If no breadcrumbs exist, the plugin hasn't run on this page yet
    if (!doc.breadcrumbs || doc.breadcrumbs.length === 0) return false

    const lastBreadcrumb = doc.breadcrumbs[doc.breadcrumbs.length - 1]
    return lastBreadcrumb.url === fullPath
  })

  return exactPage || null
}
