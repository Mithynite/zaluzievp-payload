import { cn } from '@/utils/ui'

interface IInputProps extends React.ComponentProps<'input'> {
  label?: string
  value?: string
  className?: string
}

export default function Input({ label, value, className, ...props }: IInputProps) {
  return (
    <label className="flex flex-col w-full uppercase font-semibold">
      {label}
      <input
        {...props}
        value={value}
        className={cn(
          'h-11 p-2 border-2 border-gray bg-white',
          'focus:outline-none focus:ring-0 focus:border-gray',
          'autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]',
          className,
        )}
      />
    </label>
  )
}
