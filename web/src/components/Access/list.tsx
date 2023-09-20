import { AccessList } from '@/app/acessos/page'
import { formatters } from 'racsys-js-tools'
import ComponentIsVisible from '../utils/IsVisible'
interface Props {
  access: AccessList
  addColorRow: boolean
}

enum IType {
  'Entrada' = 'E',
  'Saída' = 'S',
}

export default function List({ access, addColorRow }: Props) {
  const bgColor = addColorRow ? 'bg-transparent' : 'bg-gray-300'
  const date = formatters.date(access.date_time)

  return (
    <div
      className={`${bgColor} p-2 text-black mt-2 grid grid-cols-[1fr_1fr_10rem]`}
    >
      <p>{access.gym_student.name}</p>
      <p>{date}</p>
      <ComponentIsVisible when={access.type === IType.Entrada}>
        <p>Entrada</p>
      </ComponentIsVisible>
      <ComponentIsVisible when={access.type === IType.Saída}>
        <p>Saída</p>
      </ComponentIsVisible>
    </div>
  )
}
