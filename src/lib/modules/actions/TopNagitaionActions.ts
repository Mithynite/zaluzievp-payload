'use server'

import config from '@payload-config'
import { getPayload } from 'payload'

export async function $getTopNavigationData() {
  const payload = await getPayload({ config })

  const data = await payload.findGlobal({
    slug: 'topNavigation',
  })

  return data || null
}
