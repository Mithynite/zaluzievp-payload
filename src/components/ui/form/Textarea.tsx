interface IInputProps extends React.ComponentProps<'textarea'> {
  label?: string
  error?: string
}

export default function Input({ label, error, ...props }: IInputProps) {
  return (
    <div>
      <label>
        {label}
        <textarea {...props} />
      </label>
    </div>
  )
}
