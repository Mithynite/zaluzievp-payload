import { Form } from '@/payload-types'

export type FormEmail = NonNullable<Form['emails']>[number]
