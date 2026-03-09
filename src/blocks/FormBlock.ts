import { TagField } from '@/fields/TagField'
import { TitleField } from '@/fields/TitleField'
import { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'formBlock',
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
