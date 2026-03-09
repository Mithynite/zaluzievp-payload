import HeaderClient from './HeaderClient'
import { $getHeaderData } from '@/lib/modules/actions/HeaderActions'

export default async function HeaderWrapper() {
  const data = await $getHeaderData()

  return <HeaderClient {...data} />
}
