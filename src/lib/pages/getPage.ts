import config from '@payload-config'
import { getPayload } from 'payload'

export default async function getPage(path?: string[]) {
  const payload = await getPayload({ config })
  const fullPath = path ? `/${path.join('/')}` : '/'

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      path: {
        equals: fullPath,
      },
    },
  })

  return docs[0] || null
}
