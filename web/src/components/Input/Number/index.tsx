import { ChangeEvent, forwardRef, useImperativeHandle, useRef } from 'react'
import InputBase, { InputBaseProps, InputBaseRefProps } from '../Base'

type InputNumberRefProps = InputBaseRefProps

type InputNumberProps = InputBaseProps

const InputNumberWithRef: React.ForwardRefRenderFunction<
  InputNumberRefProps,
  InputNumberProps
> = ({ onChange, ...rest }, ref) => {
  const inputRef = useRef<InputBaseRefProps>(null)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueFormatted = event.target.value.replace(/[^0-9/.]/g, '')
    inputRef.current?.setValue(valueFormatted)
    if (onChange) {
      onChange(event)
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      getValue: (): string => inputRef.current?.getValue() || '',
      setError: (error: string): void => inputRef.current?.setError(error),
      setValue: (value: string): void => inputRef.current?.setValue(value),
    }),
    [],
  )

  return (
    <InputBase
      {...rest}
      onChange={handleInputChange}
      type="text"
      ref={inputRef}
    />
  )
}

const InputNumber = forwardRef(InputNumberWithRef)
export default InputNumber
