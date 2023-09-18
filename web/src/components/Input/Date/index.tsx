import { forwardRef } from 'react'
import InputBase, { InputBaseProps, InputBaseRefProps } from '../Base'

type InputDateRefProps = InputBaseRefProps

type InputDateProps = InputBaseProps

const InputDateWithRef: React.ForwardRefRenderFunction<
  InputDateRefProps,
  InputDateProps
> = ({ ...rest }, ref) => {
  return <InputBase {...rest} type="date" ref={ref} />
}

const InputDate = forwardRef(InputDateWithRef)
export default InputDate
