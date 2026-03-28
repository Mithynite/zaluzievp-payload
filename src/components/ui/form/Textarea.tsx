import { cn } from '@/utils/ui'

interface IInputProps extends React.ComponentProps<'textarea'> {
  label?: string
  value?: string
  classname?: string
}

export default function Input({ label, value, className, ...props }: IInputProps) {
  return (
    <label className="flex flex-col w-full uppercase font-semibold">
      {label}
      <textarea
        {...props}
        value={value}
        className={cn(
          'h-36 p-2 border-2 border-gray resize-none outline-0 bg-white',
          'focus:outline-none focus:ring-0 focus:border-gray',
          'autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]',
          className,
        )}
      />
    </label>
  )
}
