import { ButtonHTMLAttributes, ReactNode } from 'react'

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }

export function ActionButton({
  children,
  className = '',
  type = 'button',
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={`landing-button flex items-center justify-center gap-2 px-4 py-3 font-bold transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
