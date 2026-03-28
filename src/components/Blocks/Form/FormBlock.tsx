'use client'
import Title from '@/components/ui/Title'
import Input from '@/components/ui/form/Input'
import Textarea from '@/components/ui/form/Textarea'
import { useContactStore } from '@/lib/stores/ContactStore'
import { SingleBlock } from '@/lib/types/SingleBlocks'
import { FormField } from '@/lib/types/FormField'
import { Form } from '@/payload-types'
import { useState } from 'react'
import Button from '@/components/ui/form/Button'
import { $submitForm } from '@/lib/modules/actions/FormActions'
import { Spinner } from '@/components/ui/spinner'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default function FormBlock(data: Extract<SingleBlock, { blockType: 'formBlock' }>) {
  const title = data.title
  const form: Omit<Form, 'updatedAt' | 'createdAt'> | null =
    typeof data.form === 'object' && data.form ? data.form : null

  const formId = form?.id
  //const emails = form?.emails
  const confirmationMessage = form?.confirmationMessage ?? ''
  const submitButtonLabel = form?.submitButtonLabel ?? 'Odeslat'

  const initialFields: FormField[] = form?.fields ? form.fields : []
  const formFieldErrors = Object.fromEntries(
    initialFields.map((f) => {
      const fname = 'name' in f && f.name ? f.name : null
      if (!fname) return []
      return [fname, '']
    }),
  )

  const { fields, setField, resetForm } = useContactStore()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [message, setMessage] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | string[] | undefined>>({
    ...formFieldErrors,
    position: '',
    formError: '',
  })

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/[^\d+]/g, '')
    const hasPlus = cleaned.startsWith('+')
    const digits = hasPlus ? cleaned.slice(1) : cleaned

    const groups = digits.match(/.{1,3}/g)
    const formattedDigits = groups ? groups.join(' ') : ''

    return hasPlus ? `+${formattedDigits}` : formattedDigits
  }

  async function handleSubmission(formData: FormData) {
    setIsSubmitting(true)
    setFieldErrors({
      ...formFieldErrors,
      position: '',
      formError: '',
    })
    if (!formId) {
      setFieldErrors((prev) => ({ ...prev, formError: 'Formulář není správně nakonfigurován.' }))
      setIsSubmitting(false)
      return
    }

    try {
      const response = await $submitForm({ formData, initialFields, formId })
      if (response.success) {
        resetForm()
        setMessage(confirmationMessage)
      } else {
        if (response.fieldErrors) {
          setFieldErrors({ ...response.fieldErrors })
        } else {
          setFieldErrors({
            ...fieldErrors,
            formError: 'Něco se pokazilo. Zkuste to prosím znovu.',
          })
        }
        setMessage(null)
      }
    } catch (_e) {
      setFieldErrors({
        ...fieldErrors,
        formError: 'Došlo k chybě. Zkuste to prosím znovu.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function chooseInputField(field: FormField) {
    const blockType = field.blockType
    const fname = 'name' in field && field.name ? field.name : null
    const required = 'required' in field && field.required ? field.required : false
    const label =
      'label' in field && field.label
        ? required
          ? field.label + ' *'
          : field.label
        : 'Žádný popisek'

    const widthPercentage = 'width' in field && field.width ? field.width : 100
    const maxLength = 'maxLength' in field && field.maxLength ? field.maxLength : null
    if (!fname) return null

    let fieldComponent
    let onChangeFunction

    switch (blockType) {
      case 'textarea':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChangeFunction = (e: any) => setField(fname, e.target.value, required)
        fieldComponent = (
          <Textarea
            value={fields[fname]?.value ?? ''}
            onChange={onChangeFunction}
            name={fname}
            required={required}
            label={label}
            maxLength={maxLength ?? undefined}
            aria-invalid={!!fieldErrors[fname]}
            className={widthPercentage && `w-[${widthPercentage}%]`}
          />
        )
        break
      case 'text':
      case 'email':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChangeFunction = (e: any) => setField(fname, e.target.value, required)
        fieldComponent = (
          <Input
            value={fields[fname]?.value ?? ''}
            onChange={onChangeFunction}
            name={fname}
            required={required}
            label={label}
            maxLength={maxLength ?? undefined}
            aria-invalid={!!fieldErrors[fname]}
            className={widthPercentage && `w-[${widthPercentage}%]`}
          />
        )
        break
      case 'phoneNumber':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChangeFunction = (e: any) => setField(fname, formatPhoneNumber(e.target.value), required)
        fieldComponent = (
          <Input
            value={fields[fname]?.value ?? ''}
            onChange={onChangeFunction}
            name={fname}
            required={required}
            label={label}
            aria-invalid={!!fieldErrors[fname]}
            className={widthPercentage && `w-[${widthPercentage}%]`}
          />
        )
        break
      default:
        return null
    }

    return (
      <div
        key={field.id}
        style={{ '--custom-width': `${widthPercentage}%` } as React.CSSProperties}
        className="h-auto w-full px-3 mb-6 tablet:w-(--custom-width)"
      >
        {fieldComponent}
        {fieldErrors[fname] ? (
          <div className="flex w-full flex-col gap-0.5 px-1 py-0.5 tablet:py-1.5 text-sm">
            {!Array.isArray(fieldErrors[fname])
              ? fieldErrors[fname]
              : fieldErrors[fname].map((error) => {
                  return (
                    <span
                      className="text-errorish text-[13px] tablet:text-[15px] laptop:text-[20px]"
                      key={error}
                    >
                      {error}
                    </span>
                  )
                })}
          </div>
        ) : null}
      </div>
    )
  }

  // message only if it is sent
  //
  return (
    <>
      <Title title={title} classNameMarker="bg-rot" />

      {message ? (
        <div className="px-6">
          <RichText data={message} className="text-xl tablet:text-2xl laptop:text-2xl" />
        </div>
      ) : (
        <form
          className="flex flex-col laptop:max-w-4xl justify-start gap-2 px-6 tablet:px-8"
          action={async (formData) => {
            await handleSubmission(formData)
          }}
        >
          <div className="w-full flex flex-wrap -mx-3 bg-simple-bg box-border p-5">
            {form && 'fields' in form && form.fields && form.fields.length > 0
              ? form.fields.map((field) => chooseInputField(field))
              : 'Formulář neobsahuje žádná pole.'}
            <Button text={submitButtonLabel} type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner className="size-6 text-white" /> : null}
              <Spinner className="size-6 text-white" />
              {isSubmitting ? 'Odesílám...' : submitButtonLabel}
            </Button>
          </div>
        </form>
      )}
    </>
  )
}
