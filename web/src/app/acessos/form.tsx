import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import InputBase, { InputBaseRefProps } from '@/components/Input/Base'
import ComponentModalDefault, {
  IComponentModalDefaultRefProps,
} from '@/components/modal/Default'
import InputSelect, { InputSelectRefProps } from '@/components/Input/Select'
import loadAthleteListToSelect from '@/services/athlete/loadAthleteListToSelect'

export interface FormDataProps {
  gym_student_id: number
  type: string
}

export interface IAccessFormRefProps {
  close(): void
  open(): void
  getValue(): FormDataProps
}

interface IProps {
  onSubmit(): void
}

interface IAccessList {
  value: number
  label: string
}

const AccessFormWithRef: ForwardRefRenderFunction<
  IAccessFormRefProps,
  IProps
> = ({ onSubmit }, ref) => {
  const componentModalBaseRef = useRef<IComponentModalDefaultRefProps>(null)
  const [hideModal, setHideModal] = useState<boolean>(false)
  const inputSelectRef = useRef<InputSelectRefProps>(null)
  const inputTypeRef = useRef<InputBaseRefProps>(null)
  const [infoAccess, setInfoAccess] = useState<IAccessList[]>([])

  const openModal = useCallback(() => {
    setHideModal(false)
    componentModalBaseRef.current?.open()
  }, [])

  const closeModal = useCallback(() => {
    setHideModal(true)
    componentModalBaseRef.current?.close()
  }, [])

  function getFormDataValues(): FormDataProps {
    if (!inputTypeRef.current) {
      throw new Error('inputTypeRef não encontrado')
    }
    if (!inputSelectRef.current) {
      throw new Error('inputSelectRef não encontrado')
    }
    const gymStudentIdValue = inputSelectRef.current.getValue()
    if (gymStudentIdValue === null) {
      throw new Error('gymStudentIdValue nulo')
    }
    return {
      type: inputTypeRef.current.getValue(),
      gym_student_id: gymStudentIdValue[0].value as number,
    }
  }

  async function handleSubmit() {
    try {
      onSubmit()
      closeModal()
    } catch (error) {
      throw new Error('Erro ao liberar atleta')
    }
  }

  async function handleLoadAthleteListToSelect() {
    try {
      await loadAthleteListToSelect({
        onSuccess: (data) => setInfoAccess(data),
      })
    } catch (error) {
      throw new Error('Erro ao carregar a listagem de atletas')
    }
  }

  useImperativeHandle(ref, () => ({
    open: openModal,
    close: closeModal,
    getValue: getFormDataValues,
  }))

  useEffect(() => {
    handleLoadAthleteListToSelect()
  }, [])

  return (
    <>
      <ComponentModalDefault
        onClick={handleSubmit}
        buttonColor="bg-green-500"
        buttonText="Liberar"
        ref={componentModalBaseRef}
        title="Liberar atleta"
      >
        <div className={`${hideModal ? 'hideModal' : ''}`} />
        <form className="h-56">
          <div className="flex flex-col gap-2 w-80">
            <InputSelect
              options={infoAccess}
              ref={inputSelectRef}
              label="Atletas"
            />
            <div className="mt-4 w-32">
              <InputBase label="Entrada / Saída" ref={inputTypeRef} />
            </div>
          </div>
        </form>
      </ComponentModalDefault>
    </>
  )
}

const AccessForm = forwardRef(AccessFormWithRef)
export default AccessForm
