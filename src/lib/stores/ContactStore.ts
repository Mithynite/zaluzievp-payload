import { create } from 'zustand'

interface ContactState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: Record<string, { value: any; required: boolean }>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initializeFields: (fields: Record<string, { value: any; required: boolean }>) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setField: (field: string, value: any, required: boolean) => void
  resetForm: () => void
}

export const useContactStore = create<ContactState>((set) => ({
  fields: {},
  initializeFields: (incomingFields) =>
    set({
      fields: incomingFields,
    }),
  setField: (field, value, required) =>
    set((state) => ({
      fields: {
        ...state.fields,
        [field]: { value: value, required: required },
      },
    })),
  resetForm: () =>
    set({
      fields: {},
    }),
}))
