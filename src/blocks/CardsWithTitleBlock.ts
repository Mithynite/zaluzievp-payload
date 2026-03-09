import { TagField } from '@/fields/TagField'
import { TitleField } from '@/fields/TitleField'
import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const CardsWithTitleBlock: Block = {
  slug: 'cardsWithTitleBlock',
  labels: {
    singular: 'Karta s titulkem',
    plural: 'Karty s titulky',
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
          name: 'subTitle',
          label: 'Podnadpis',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          label: 'Obrázek',
          type: 'relationship',
          relationTo: 'media',
          hasMany: false,
          required: true,
        },
        {
          name: 'toPage',
          label: 'Odkaz na stránku',
          type: 'relationship',
          relationTo: 'pages', // TODO: I do not know if that would be alright
          required: true,
        },
      ],
    },
  ],
}
