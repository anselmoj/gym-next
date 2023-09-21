import { AccessList } from '@/app/acessos/page'
import ComponentIsVisible from '../utils/IsVisible'
import date from '../../formatters/date'
import EType from '@/enums/Type'
interface Props {
  access: AccessList
  addColorRow: boolean
}

export default function List({ access, addColorRow }: Props) {
  const bgColor = addColorRow ? 'bg-transparent' : 'bg-gray-300'
  const dateFormatted = date(access.date_time)

  return (
    <div
      className={`${bgColor} p-2 text-black mt-2 grid grid-cols-[1fr_1fr_10rem]`}
    >
      <p>{access.gym_student.name}</p>
      <p>{dateFormatted}</p>
      <ComponentIsVisible when={access.type === EType.Entrada}>
        <p>Entrada</p>
      </ComponentIsVisible>
      <ComponentIsVisible when={access.type === EType.Saída}>
        <p>Saída</p>
      </ComponentIsVisible>
    </div>
  )
}
