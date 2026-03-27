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
      name: 'title',
      label: 'Titulek',
      type: 'text',
      required: false,
    },
    {
      name: 'slug',
      label: 'Část URL adresy (slug)',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: "Např. reference, montaz-sulice atd. (pro hlavní stránku stačí zadat 'index')",
      },
    },
    {
      name: 'blocks',
      label: 'Sekce stránky',
      type: 'blocks',
      blocks: [FormBlock, CardsWithDescriptionBlock, CardsWithTitleBlock],
    },
  ],
}
