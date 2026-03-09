import { TitleField } from '@/fields/TitleField'
import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    TitleField,
    {
      name: 'links',
      label: 'Odkazy',
      type: 'array',
      fields: [
        TitleField,
        {
          name: 'page',
          label: 'Vyber stránku',
          type: 'relationship',
          relationTo: 'pages',
          hasMany: false,
          required: true,
        },
        {
          name: 'anchor',
          label: 'Zadej tag sekce',
          defaultValue: '',
          type: 'text',
          required: false,
          admin: {
            description: 'Např. "kontakt". Pokud je vyplněno, odkaz zacílí na tuto sekci.',
          },
        },
      ],
    },
  ],
}
