import { CardsWithDescriptionBlock } from '@/blocks/CardsWithDescriptionBlock'
import { CardsWithTitleBlock } from '@/blocks/CardsWithTitleBlock'
import { FormBlock } from '@/blocks/FormBlock'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Stránka',
    plural: 'Stránky',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'parent',
      label: 'Rodičovská stránka',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
        description: '',
      },
      filterOptions: ({ id }) => {
        if (id) {
          return {
            id: { not_equals: id },
          }
        }
        return false
      },
    },
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
      blocks: [FormBlock, CardsWithDescriptionBlock, CardsWithTitleBlock],
    },
  ],
}
