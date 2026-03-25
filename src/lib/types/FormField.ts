import { Form } from '@/payload-types'

export type FormField = NonNullable<Form['fields']>[number]
