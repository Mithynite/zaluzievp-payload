import { Block } from 'payload'

export const PhoneNumberBlock: Block = {
  slug: 'phoneNumber',
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
          required: true,
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
          name: 'formatError',
          type: 'text',
        },
      ],
    },
  ],
}
