'use server'

import config from '@payload-config'
import { getPayload } from 'payload'

export async function $getFooterData() {
  const payload = await getPayload({ config })

  const data = await payload.findGlobal({
    slug: 'footer',
    depth: 2,
  })

  return data || null
}
