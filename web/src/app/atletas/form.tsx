import InputBase, { InputBaseRefProps } from '@/components/Input/Base'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import {
  FormEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

import InputCheckbox, {
  InputCheckboxRefProps,
} from '@/components/Input/Checkbox'

export interface FormDataProps {
  name: string
  gender: string
  is_active: boolean
}

interface InitialData {
  name: string
  gender: string
  is_active: boolean
}

export interface FormRefProps {
  getValues(): FormDataProps
  clearValues(): void
}

interface Props {
  onSubmit(): void
  initialData?: InitialData
}

interface Errors {
  [key: string]: string
}

const validation = Yup.object().shape({
  name: Yup.string().required('Campo nome é obrigatório'),
  gender: Yup.string().required('Campo gênero é obrigatório'),
})

const AthleteForm: React.ForwardRefRenderFunction<FormRefProps, Props> = (
  { onSubmit, initialData },
  ref,
) => {
  const inputNameRef = useRef<InputBaseRefProps>(null)
  const inputGenderRef = useRef<InputBaseRefProps>(null)
  const inputIsActiveRef = useRef<InputCheckboxRefProps>(null)
  const router = useRouter()

  function handleGoBack() {
    router.back()
  }

  function getFormDataValues(): FormDataProps {
    if (!inputNameRef.current) {
      throw new Error('inputNameRef não encontrado')
    }
    if (!inputGenderRef.current) {
      throw new Error('inputGenderRef não encontrado')
    }
    if (!inputIsActiveRef.current) {
      throw new Error('inputIsActiveRef não encontrado')
    }

    return {
      name: inputNameRef.current.getValue(),
      gender: inputGenderRef.current.getValue(),
      is_active: inputIsActiveRef.current.getValue(),
    }
  }

  function setFormErrorValues(errors: {
    [key in keyof FormDataProps]: string
  }): void {
    if (!inputNameRef.current) {
      throw new Error('inputNameRef não encontrado')
    }
    if (!inputGenderRef.current) {
      throw new Error('inputGenderRef não encontrado')
    }
    if (!inputIsActiveRef.current) {
      throw new Error('inputIsActiveRef não encontrado')
    }
    inputNameRef.current.setError(errors.name || '')
    inputGenderRef.current.setError(errors.gender || '')
  }

  function clearFormDataValues(): void {
    if (!inputNameRef.current) {
      throw new Error('inputNameRef não encontrado')
    }
    if (!inputGenderRef.current) {
      throw new Error('inputGenderRef não encontrado')
    }
    if (!inputIsActiveRef.current) {
      throw new Error('inputIsActiveRef não encontrado')
    }
    inputNameRef.current.setValue('')
    inputGenderRef.current.setValue('')
  }

  function getErrors(errors: Yup.ValidationError): Errors {
    const validationErros: Errors = {}

    errors.inner.forEach((error) => {
      validationErros[String(error.path)] = error.message
    })
    return validationErros
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formValues = getFormDataValues()
    try {
      await validation.validate(formValues, {
        abortEarly: false,
      })
      onSubmit()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationError = getErrors(error)
        setFormErrorValues({
          name: validationError.name,
          gender: validationError.gender,
          is_active: validationError.is_active,
        })
      }
      throw new Error('Erro ao adicionar atleta')
    }
  }

  useImperativeHandle(ref, () => ({
    clearValues: clearFormDataValues,
    getValues: getFormDataValues,
  }))

  useEffect(() => {
    if (initialData) {
      if (!inputNameRef.current) {
        throw new Error('inputNameRef não encontrado')
      }
      if (!inputGenderRef.current) {
        throw new Error('inputGenderRef não encontrado')
      }
      inputNameRef.current.setValue(initialData.name)
      inputGenderRef.current.setValue(initialData.gender)
      inputIsActiveRef.current?.setValue(initialData.is_active)
    }
  }, [initialData])

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 w-80">
        <InputBase label="Nome" ref={inputNameRef} />
        <div className="mt-2">
          <InputBase label="Gênero" ref={inputGenderRef} />
        </div>
        <div className="mt-2">
          <InputCheckbox label="Ativo" ref={inputIsActiveRef} />
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleGoBack}
          type="button"
          className="p-1 bg-red-500 w-28 rounded-lg"
        >
          Cancelar
        </button>
        <button className="p-1 bg-green-500 w-28 rounded-lg">Salvar</button>
      </div>
    </form>
  )
}

export default forwardRef(AthleteForm)
