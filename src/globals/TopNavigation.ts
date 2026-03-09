import { GlobalConfig } from 'payload'

export const TopNavigation: GlobalConfig = {
  slug: 'topNavigation',
  fields: [
    {
      name: 'contacts',
      label: 'Kontakty',
      type: 'array',
      fields: [
        {
          name: 'value',
          label: 'Hodnota',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          label: 'Typ kontaktu',
          type: 'select',
          options: [
            {
              label: 'Telefonní číslo',
              value: 'phone',
            },
            {
              label: 'E-mail',
              value: 'email',
            },
          ],
          required: true,
        },
      ],
    },
  ],
}
