import { TagField } from '@/fields/TagField'
import { TitleField } from '@/fields/TitleField'
import { Block } from 'payload'

export const CardsWithDescriptionBlock: Block = {
  slug: 'cardsWithDescriptionBlock',
  labels: {
    singular: 'Karty s popisky',
    plural: 'Karty s popisky',
  },
  fields: [
    TitleField,
    TagField,
    {
      name: 'cards',
      label: 'Karty',
      type: 'array',
      fields: [
        TitleField,
        {
          name: 'image',
          label: 'Obrázek',
          type: 'relationship',
          relationTo: 'media',
          hasMany: false,
          required: false,
        },
        {
          name: 'description',
          label: 'Popisek',
          type: 'textarea',
          required: false,
          maxLength: 500,
        },
      ],
    },
  ],
}
