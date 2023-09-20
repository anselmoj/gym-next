import {
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export interface InputCheckboxRefProps {
  getValue(): boolean
  setError(error: string): void
  setValue(value: boolean): void
}

interface InputCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const InputCheckboxWithRef: React.ForwardRefRenderFunction<
  InputCheckboxRefProps,
  InputCheckboxProps
> = ({ label, ...rest }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useImperativeHandle(ref, () => ({
    getValue: (): boolean => {
      return inputRef.current?.checked || false
    },
    setError: (error: string): void => {
      setErrorMessage(error)
    },
    setValue: (value: boolean): void => {
      if (inputRef.current) {
        inputRef.current.checked = value
      }
    },
  }))

  return (
    <div className="flex items-center flex-row gap-2">
      <input {...rest} type="checkbox" ref={inputRef} />
      {label && <label className="text-gray-700">{label}</label>}
      <div>
        {!!errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  )
}

const InputCheckbox = forwardRef(InputCheckboxWithRef)
export default InputCheckbox
