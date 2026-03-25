import { Page } from '@/payload-types'

export type SingleBlock = NonNullable<Page['blocks']>[number]
