import { AthleteList } from '@/app/atletas/page'
import { Check, PencilLine, X } from '@phosphor-icons/react'
import Link from 'next/link'
import ComponentIsVisible from '../utils/IsVisible'

enum IGender {
  'Masculino' = 'M',
  'Feminino' = 'F',
}

interface Props {
  athlete: AthleteList
  addColorRow: boolean
  openEnable(data: AthleteList): void
  openDisable(data: AthleteList): void
}

export default function List({
  athlete,
  addColorRow,
  openEnable,
  openDisable,
}: Props) {
  const bgColor = addColorRow ? 'bg-transparent' : 'bg-gray-300'

  return (
    <div
      className={`${bgColor} p-2 text-black mt-2 grid grid-cols-[5rem_1fr_1fr_1fr_5rem]`}
    >
      <p>{athlete.id}</p>
      <p>{athlete.name}</p>
      <ComponentIsVisible when={athlete.gender === IGender.Masculino}>
        <p>Masculino</p>
      </ComponentIsVisible>
      <ComponentIsVisible when={athlete.gender === IGender.Feminino}>
        <p>Feminino</p>
      </ComponentIsVisible>
      <ComponentIsVisible when={athlete.is_active === true}>
        <p>Ativo</p>
      </ComponentIsVisible>
      <ComponentIsVisible when={athlete.is_active === false}>
        <p>Inativo</p>
      </ComponentIsVisible>

      <div className="flex items-center gap-2 cursor-pointer">
        <ComponentIsVisible when={athlete.is_active === false}>
          <div
            onClick={() => openEnable(athlete)}
            title="Ativar"
            className="text-green-600"
          >
            <Check size={22} />
          </div>
        </ComponentIsVisible>

        <ComponentIsVisible when={athlete.is_active === true}>
          <div
            onClick={() => openDisable(athlete)}
            title="Desativar"
            className="text-red-600"
          >
            <X size={22} />
          </div>
        </ComponentIsVisible>

        <Link
          title="Editar"
          className="text-blue-700"
          href={`/atletas/${athlete.id}/editar`}
        >
          <PencilLine size={22} />
        </Link>
      </div>
    </div>
  )
}
