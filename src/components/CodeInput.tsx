import { InputHTMLAttributes } from 'react'

type CodeInputProps = InputHTMLAttributes<HTMLInputElement>

export function CodeInput({ className = '', ...props }: CodeInputProps) {
  return (
    <input
      className={`code-input min-w-0 flex-1 px-4 py-3 outline-none transition ${className}`}
      {...props}
    />
  )
}
