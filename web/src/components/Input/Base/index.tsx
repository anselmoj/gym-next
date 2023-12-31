'use client'

import { Icon } from '@phosphor-icons/react'
import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export interface InputBaseRefProps {
  getValue(): string
  setError(error: string): void
  setValue(value: string): void
}

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean
  label?: string
  icon?: Icon
  placeholder?: string
}

const InputBaseWithRef: React.ForwardRefRenderFunction<
  InputBaseRefProps,
  InputBaseProps
> = (
  {
    label,
    icon: InputIcon,
    type = 'text',
    disabled,
    onChange,
    placeholder,
    readOnly,
  },
  ref,
) => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [inputType] = useState<string>(type)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value
    if (inputRef.current) {
      inputRef.current.value = text
    }
    if (onChange) {
      onChange(event)
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      getValue: (): string => {
        return inputRef.current?.value || ''
      },
      setError: (error: string): void => {
        setErrorMessage(error)
      },
      setValue: (value: string): void => {
        if (inputRef.current) {
          inputRef.current.value = value
        }
      },
    }),
    [],
  )

  return (
    <div className="w-full">
      {label && <label className="text-gray-700">{label}</label>}
      <div className="flex w-full items-center gap-2 border-gray-300 border  rounded p-2 bg-gray-200 text-gray-950">
        {InputIcon && <InputIcon size={22} />}

        <input
          className="outline-none max-w-full bg-transparent"
          type={inputType}
          disabled={disabled}
          readOnly={readOnly}
          ref={inputRef}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      </div>
      <div>
        {!!errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  )
}

const InputBase = forwardRef(InputBaseWithRef)
export default InputBase
