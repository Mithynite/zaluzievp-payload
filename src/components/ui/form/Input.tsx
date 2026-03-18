interface IInputProps extends React.ComponentProps<'input'> {
  label?: string
  error?: string
}

export default function Input({ label, error, ...props }: IInputProps) {
  return (
    <div>
      <label>
        {label}
        <input {...props} />
      </label>
    </div>
  )
}
