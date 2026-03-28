import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'title',
      label: 'Titulek',
      type: 'text',
      required: true,
      maxLength: 25,
    },
    {
      name: 'links',
      label: 'Odkazy',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'title',
          label: 'Titulek',
          type: 'text',
          required: true,
          maxLength: 15,
        },
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
            description: "Např. 'contact', pokud je vyplněno, odkaz zacílí na tuto sekci",
          },
        },
      ],
    },
  ],
}
