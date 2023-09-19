import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import ComponentModalAlert, {
  IRefProps as ComponentModalBaseRefProps,
} from '../../components/modal/Alert'
import { useRouter } from 'next/navigation'
import disableAthlete from '@/services/athlete/disableAthlete'
import { AthleteList } from './page'

export interface IAthleteDisableRefProps {
  close(): void
  open(data: AthleteList): void
}

const AthleteDisable: ForwardRefRenderFunction<IAthleteDisableRefProps> = (
  _,
  ref,
) => {
  const componentModalBaseRef = useRef<ComponentModalBaseRefProps>(null)
  const [hideModal, setHideModal] = useState<boolean>(false)
  const [disableValues, setDisableValues] = useState<AthleteList>(
    {} as AthleteList,
  )
  const openModal = useCallback((data: AthleteList) => {
    setHideModal(false)
    setDisableValues(data)
    componentModalBaseRef.current?.open()
  }, [])
  const router = useRouter()

  const closeModal = useCallback(() => {
    setHideModal(true)
    componentModalBaseRef.current?.close()
  }, [])

  useImperativeHandle(ref, () => ({
    open: openModal,
    close: closeModal,
  }))

  async function handleDisableAthlete() {
    try {
      await disableAthlete({
        onSuccess: () => router.refresh(),
        id: disableValues.id,
      })
    } catch (error) {
      throw new Error('Erro ao desabilitar atleta')
    }
  }

  return (
    <>
      <ComponentModalAlert
        buttonColor="bg-red-500"
        onClick={handleDisableAthlete}
        buttonText="Desativar"
        iconType="WARNING"
        message="Deseja desabilitar esse atleta?
  "
        ref={componentModalBaseRef}
        title="Desabilitar atleta"
      >
        <div className={`${hideModal ? 'hideModal' : ''}`} />
      </ComponentModalAlert>
    </>
  )
}

export default forwardRef(AthleteDisable)
