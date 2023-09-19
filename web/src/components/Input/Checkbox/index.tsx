import {
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'

export interface InputCheckboxRefProps {
  getValue(): boolean
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

  useImperativeHandle(ref, () => ({
    getValue: (): boolean => {
      return inputRef.current?.checked || false
    },
    setValue: (value: boolean): void => {
      if (inputRef.current) {
        inputRef.current.checked = value
      }
    },
  }))

  return (
    <div className="flex items-center flex-row gap-2">
      <input
        {...rest}
        type="checkbox"
        ref={inputRef}
        // className="appearance-none h-[1.2rem] w-[1.2rem] border-[1px] rounded border-solid border-slate-400 checked:bg-zinc-700"
      />
      {label && <label className="text-gray-700">{label}</label>}
    </div>
  )
}

const InputCheckbox = forwardRef(InputCheckboxWithRef)
export default InputCheckbox
