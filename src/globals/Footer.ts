import { TitleField } from '@/fields/TitleField'
import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    TitleField,
    {
      name: 'description',
      label: 'Popisek stránky',
      type: 'textarea',
      maxLength: 70,
      required: false,
    },
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
          defaultValue: 'phone',
          hasMany: false,
        },
      ],
    },
    {
      name: 'followLinks',
      label: 'Odkazy na sociální sítě',
      type: 'array',
      fields: [
        {
          name: 'link',
          label: 'Odkaz',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          label: 'Sociální síť',
          admin: {
            description:
              'Vyberte sociální síť, která koresponduje s Vaším odkazem, podle toho se totiž vybere příslušná ikonka.',
          },
          type: 'select',
          options: [
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'FaceBook',
              value: 'facebook',
            },
            {
              label: 'X (Twitter)',
              value: 'twitter',
            },
            {
              label: 'YouTube',
              value: 'youtube',
            },
          ],
          required: true,
          hasMany: false,
        },
      ],
    },
    {
      name: 'links',
      label: 'Další odkazy',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Název',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Odkaz (URL)',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'subfooter',
      type: 'group',
      fields: [
        {
          name: 'rights',
          type: 'text',
          required: false,
        },
        {
          name: 'author',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
}
