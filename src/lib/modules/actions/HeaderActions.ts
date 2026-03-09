'use server'

import config from '@payload-config'
import { getPayload } from 'payload'

export async function $getHeaderData() {
  const payload = await getPayload({ config })

  const data = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })

  return data || null
}
