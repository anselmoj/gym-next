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
import enableAthlete from '@/services/athlete/enableAthlete'
import { useRouter } from 'next/navigation'
import { AthleteList } from './page'

export interface IAthleteEnableRefProps {
  close(): void
  open(data: AthleteList): void
}

const AthleteEnable: ForwardRefRenderFunction<IAthleteEnableRefProps> = (
  _,
  ref,
) => {
  const componentModalBaseRef = useRef<ComponentModalBaseRefProps>(null)
  const [hideModal, setHideModal] = useState<boolean>(false)
  const [enableValues, setEnableValues] = useState<AthleteList>(
    {} as AthleteList,
  )
  const openModal = useCallback((data: AthleteList) => {
    setHideModal(false)
    setEnableValues(data)
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

  async function handleEnableAthlete() {
    try {
      await enableAthlete({
        id: enableValues.id,
        onSuccess: () => router.refresh(),
      })
    } catch (error) {
      throw new Error('Erro ao habilitar atleta')
    }
  }

  return (
    <>
      <ComponentModalAlert
        onClick={handleEnableAthlete}
        buttonColor="bg-green-500"
        buttonText="Ativar"
        iconType="WARNING"
        message="Deseja ativar esse atleta?
  "
        ref={componentModalBaseRef}
        title="Ativar atleta"
      >
        <div className={`${hideModal ? 'hideModal' : ''}`} />
      </ComponentModalAlert>
    </>
  )
}

export default forwardRef(AthleteEnable)
