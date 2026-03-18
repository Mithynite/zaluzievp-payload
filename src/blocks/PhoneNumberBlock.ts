import { Block } from 'payload'

export const PhoneNumberBlock: Block = {
  slug: 'phoneNumber',
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
    {
      name: 'required',
      label: 'Povinné pole',
      type: 'checkbox',
      required: false,
    },
  ],
}
