'use server'

import { replaceLexicalVariables } from '@/lib/helpers/formEmailHelpers'
import { serializeLexicalToHTML } from '@/lib/helpers/lexicalSerializer'
import { FormEmail } from '@/lib/types/FormEmail'
import { FormField } from '@/lib/types/FormField'
import config from '@/payload.config'
import { getPayload } from 'payload'
import * as z from 'zod'

interface ISubmitFormProps {
  formData: FormData
  initialFields: FormField[]
  formId: number
}

export async function $submitForm({ formData, initialFields, formId }: ISubmitFormProps) {
  const fieldSummary: Record<string, string> = {}
  function buildFieldValidation(field: FormField) {
    const blockType = field.blockType
    const fname = 'name' in field && field.name ? field.name : null
    const required = 'required' in field && field.required ? field.required : false
    const maxLength = 'maxLength' in field && field.maxLength ? field.maxLength : null

    //errors
    const errors = 'errors' in field && field.errors ? field.errors : {}
    const requiredErr =
      'requiredError' in errors && errors.requiredError ? errors.requiredError : ''
    const maxLengthErr =
      'maxLengthError' in errors && errors.maxLengthError ? errors.maxLengthError : ''

    const incorrectFormatErr: string =
      'incorrectFormatError' in errors && typeof errors.incorrectFormatError === 'string'
        ? errors.incorrectFormatError
        : ''

    const emailRegex =
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i

    if (!fname) return null

    let base

    fieldSummary[fname] = blockType
    switch (blockType) {
      case 'text':
        base = z.string()
        if (required) base = base.nonempty({ error: requiredErr })
        if (maxLength) base = base.max(maxLength, { error: maxLengthErr })
        break
      case 'textarea':
        base = z.string()
        if (required) base = base.nonempty({ error: requiredErr })
        if (maxLength) base = base.max(maxLength, { error: maxLengthErr })
        break
      case 'email':
        if (required) {
          base = z.string().regex(emailRegex, { error: incorrectFormatErr })
          if (maxLength) base = base.max(maxLength, { error: maxLengthErr })
        } else {
          base = z.string().regex(emailRegex, { error: incorrectFormatErr })
          if (maxLength) base = base.max(maxLength, { error: maxLengthErr })
          base = base.or(z.literal(''))
        }
        break
      case 'phoneNumber':
        base = z.string()
        if (required) base = base.nonempty({ error: requiredErr })
        break
    }
    return base
  }

  const rawFormDataMapped = Object.fromEntries(
    initialFields.map((f) => {
      const fname = 'name' in f && f.name ? f.name : null
      if (!fname) return []
      const value = formData.get(fname)
      return [fname, value] // TODO double []
    }),
  )

  function buildValidationSchema() {
    const schema: Record<string, any> = {}
    initialFields.map((f) => {
      const fname = 'name' in f && f.name ? f.name : null
      if (!fname) return null
      const fieldSchema = buildFieldValidation(f)
      if (fieldSchema && fname) schema[fname] = fieldSchema
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return schema
  }

  const contactSchemaRemade = z.object(buildValidationSchema())
  const validatedFields = z.safeParse(contactSchemaRemade, rawFormDataMapped)

  if (!validatedFields.success) {
    const flatErrors = z.flattenError(validatedFields.error)
    return {
      success: false,
      fieldErrors: flatErrors.fieldErrors,
    }
  }

  try {
    const payload = await getPayload({ config })
    const data = validatedFields.data

    /*const submissionData = Object.entries(data).map(([key, value]) => {
      let blockType = fieldSummary[key]

      return {
        name: key,
        blockType: blockType,
        [`${blockType}Value`]: value ?? '',
      }
    }) as FormSubmission['submissionData']
     
    if (emails && emails.length > 0) {
      await Promise.all(
        emails.map(async (email) => {
          await sendEmail(data, email)
        }),
      )
    }*/

    const submissionData = Object.entries(data).map(([key, value]) => {
      return {
        field: key,
        name: key,
        value: value !== null && value !== undefined ? String(value) : '',
      }
    })

    const _payloadResult = await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData: submissionData,
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e.cause)
  }
  return { success: true }
}

/*
export async function sendEmail(data: Record<string, any>, emailTemplate: FormEmail) {
  const payload = await getPayload({ config })

  const to = emailTemplate.emailTo
  const from = emailTemplate.emailFrom
  const bcc = emailTemplate.bcc ?? ''
  const cc = emailTemplate.cc ?? ''
  const replyTo = emailTemplate.replyTo ?? ''
  const subject = emailTemplate.subject

  const populatedLexicalObject = replaceLexicalVariables(emailTemplate.message, data)
  const finalHtml = serializeLexicalToHTML(populatedLexicalObject)

  try {
    if (!to || !from || !subject)
      throw Error('Email cannot be send since all the attributes have not been filled in!')
    const emailResult = await payload.sendEmail({
      to: to,
      from: from,
      bcc: bcc,
      cc: cc,
      replyTo: replyTo,
      subject: subject,
      html: finalHtml,
    })
  } catch (e) {
    console.log(e)
  }
}
*/
