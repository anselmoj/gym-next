import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Select, {
  GroupBase,
  SelectInstance,
  Props as SelectProps,
} from 'react-select'

export type OptionTypeBase<T = string | number> = {
  label: string
  value: T
}

export interface InputSelectRefProps<T = string | number> {
  getValue: () => OptionTypeBase<T>[] | null
  setError: (error: string) => void
  setValue: (value: OptionTypeBase<T> | OptionTypeBase<T>[] | null) => void
}

interface InputSelectProps
  extends SelectProps<OptionTypeBase, boolean, GroupBase<OptionTypeBase>> {
  label?: string
  placeholder?: string
  options: OptionTypeBase<number | string>[]
}

const InputSelectWithRef: React.ForwardRefRenderFunction<
  InputSelectRefProps,
  InputSelectProps
> = ({ label, options, placeholder }, ref) => {
  const selectRef =
    useRef<SelectInstance<OptionTypeBase, boolean, GroupBase<OptionTypeBase>>>(
      null,
    )
  const [errorMessage, setErrorMessage] = useState<string>('')

  useImperativeHandle(
    ref,
    () => ({
      getValue: (): OptionTypeBase[] | null => {
        if (selectRef.current?.getValue().length) {
          return selectRef.current?.getValue().map((item) => ({
            value: item.value,
            label: item.label,
          }))
        }
        return null
      },
      setError: (error: string): void => {
        setErrorMessage(error)
      },
      setValue: (value: OptionTypeBase | OptionTypeBase[] | null): void => {
        if (selectRef.current) {
          selectRef.current.setValue(value, 'select-option')
        }
      },
    }),
    [],
  )
  //          flex w-full items-center gap-2 border-gray-300 border  rounded p-2 bg-gray-200 text-gray-950
  return (
    <div className="w-full">
      {label && <label className="text-zinc-700">{label}</label>}
      <Select
        styles={{
          option: (base) => ({
            ...base,
            color: '#000',
            ':active': {
              backgroundColor: '#000',
              color: '#fff',
            },
          }),
        }}
        placeholder={placeholder}
        options={options}
        ref={selectRef}
      />
      <div>
        {!!errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  )
}

const InputSelect = forwardRef(InputSelectWithRef)
export default InputSelect
