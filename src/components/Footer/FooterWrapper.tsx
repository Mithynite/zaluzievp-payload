import { $getFooterData } from '@/lib/modules/actions/FooterActions'
import FooterClient from './FooterClient'

export default async function FooterWrapper() {
  const data = await $getFooterData()
  return <FooterClient {...data} />
}
