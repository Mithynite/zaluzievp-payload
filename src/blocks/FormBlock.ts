import { TagField } from '@/fields/TagField'
import { TitleField } from '@/fields/TitleField'
import { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Kontaktní formulář',
    plural: 'Kontaktní formulář',
  },
  fields: [
    TitleField,
    TagField,
    {
      name: 'form',
      label: 'Zvolte šablonu formuláře',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      hasMany: false,
    },
  ],
}
