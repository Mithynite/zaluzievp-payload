import { CardsWithDescriptionBlock } from '@/blocks/CardsWithDescriptionBlock'
import { FormBlock } from '@/blocks/FormBlock'
import { TitleField } from '@/fields/TitleField'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Titulek',
      type: 'text',
      required: false,
    },
    {
      name: 'path',
      label: 'Cesta ke stránce',
      type: 'text',
      required: true,
    },
    {
      name: 'blocks',
      label: 'Sekce stránky',
      type: 'blocks',
      blocks: [FormBlock, CardsWithDescriptionBlock],
    },
  ],
}
