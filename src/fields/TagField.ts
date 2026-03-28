import { Field } from 'payload'

export const TagField: Field = {
  name: 'tag',
  label: 'Tag sekce (malými písmeny, bez diakritiky)',
  type: 'text',
  required: true,
  admin:{
    description:"Např.: 'contact', 'reference' atd." 
  }
  //maxLength: 30,
}
