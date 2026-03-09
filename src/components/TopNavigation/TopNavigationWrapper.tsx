import { $getTopNavigationData } from '@/lib/modules/actions/TopNagitaionActions'
import TopNavigationClient from './TopNavigationClient'

/**
 * 1) Call server function
 * 2) Get the data
 * 3) Pass it to the client component
 * 4) Render
 */

export default async function TopNavigationWrapper() {
  const data = await $getTopNavigationData()

  return <TopNavigationClient {...data} />
}
