import { Field } from 'payload'

export const TagField: Field = {
  name: 'tag',
  label: 'Tag sekce (malými písmeny, bez diakritiky)',
  type: 'text',
  required: true,
  //maxLength: 30,
}
