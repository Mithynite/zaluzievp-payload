import { TitleField } from '@/fields/TitleField'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ReferenceDetailsBlock: Block = {
  slug: 'referenceDetailsBlock',
  labels: {
    singular: 'Detaily Reference',
    plural: 'Detaily Reference',
  },
  fields: [
    TitleField,
    {
      name: 'information',
      label: 'Informace',
      type: 'group',
      fields: [
        {
          name: 'location',
          label: 'Lokace',
          type: 'text',
          required: true,
        },
        {
          name: 'services',
          label: 'Služby',
          type: 'richText',
          editor: lexicalEditor({}),
          required: true,
        },
        {
          name: 'date',
          label: 'Datum zhotovení',
          type: 'date',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      label: 'Popis',
      type: 'richText',
      required: true,
    },
    {
      name: 'images',
      label: 'Obrázky práce',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}
