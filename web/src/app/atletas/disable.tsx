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
import disableAthlete from '@/services/athlete/disableAthlete'
import { AthleteList } from './page'

export interface IAthleteDisableRefProps {
  close(): void
  open(data: AthleteList): void
}

interface IAthleteDisableProps {
  reloadList(): void
}

const AthleteDisable: ForwardRefRenderFunction<
  IAthleteDisableRefProps,
  IAthleteDisableProps
> = ({ reloadList }, ref) => {
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

  const closeModal = useCallback(() => {
    setHideModal(true)
    componentModalBaseRef.current?.close()
  }, [])

  async function handleDisableAthlete() {
    try {
      await disableAthlete({
        onSuccess: () => reloadList(),
        id: disableValues.id,
      })
      closeModal()
    } catch (error) {
      throw new Error('Erro ao inativar atleta')
    }
  }

  useImperativeHandle(ref, () => ({
    open: openModal,
    close: closeModal,
  }))

  return (
    <>
      <ComponentModalAlert
        buttonColor="bg-red-500"
        onClick={handleDisableAthlete}
        buttonText="Inativar"
        iconType="WARNING"
        message="Deseja inativar esse atleta?
  "
        ref={componentModalBaseRef}
        title="Inativar atleta"
      >
        <div className={`${hideModal ? 'hideModal' : ''}`} />
      </ComponentModalAlert>
    </>
  )
}

export default forwardRef(AthleteDisable)
