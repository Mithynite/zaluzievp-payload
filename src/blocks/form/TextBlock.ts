import { Block } from 'payload'

export const TextBlock: Block = {
  slug: 'text',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Name (lowercase, no special characters)',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          label: 'Field Width (percentage)',
          type: 'text',
          required: false,
        },
        {
          name: 'maxLength',
          label: 'Max Length',
          type: 'number',
          min: 0,
          required: false,
        },
      ],
    },
    {
      name: 'required',
      type: 'checkbox',
      required: false,
    },
    {
      name: 'errors',
      label: 'Error messages',
      type: 'group',
      fields: [
        {
          name: 'requiredError',
          type: 'text',
        },
        {
          name: 'maxLengthError',
          type: 'text',
        },
      ],
    },
  ],
}
