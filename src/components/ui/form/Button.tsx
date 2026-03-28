interface IButtonProps extends React.ComponentProps<'button'> {
  text: string
}

export default function Button({ text, ...props }: IButtonProps) {
  return (
    <button
      type={props.type}
      className="cursor-pointer outline-0 text-center text-white font-semibold bg-rot w-35 h-13 uppercase duration-200 hover:bg-rotter ml-3"
    >
      {text}
    </button>
  )
}
