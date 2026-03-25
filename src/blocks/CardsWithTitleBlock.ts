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
    singular: 'Karty s názvy',
    plural: 'Karty s názvy',
  },
  fields: [
    TitleField,
    TagField,
    {
      name: 'cards',
      label: 'Karty',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Titulek',
          type: 'text',
          required: true,
          maxLength: 25,
        },
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
    {
      name: 'textToPage',
      label: 'Text pod kartičkami',
      type: 'text',
      maxLength: 25,
    },
  ],
}
