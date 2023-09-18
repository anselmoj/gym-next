import { AthleteList } from '@/app/atletas/page'
import { Eye, PencilLine, Trash } from '@phosphor-icons/react'
import Link from 'next/link'

interface Props {
  athlete: AthleteList
  addColorRow: boolean
}

export default function List({ athlete, addColorRow }: Props) {
  const bgColor = addColorRow ? 'bg-transparent' : 'bg-gray-300'

  return (
    <div
      className={`${bgColor} p-2 text-black mt-2 grid grid-cols-[5rem_1fr_1fr_1fr_5rem]`}
    >
      <p>{athlete.id}</p>
      <p>{athlete.name}</p>
      <p>{athlete.gender}</p>
      <p>{athlete.is_active}</p>
      <div className="flex items-center gap-2 cursor-pointer">
        <Link
          title="Visualizar"
          className="text-blue-700"
          href={`/atletas/${athlete.id}`}
        >
          <Eye size={22} />
        </Link>

        <Link
          title="Editar"
          className="text-blue-700"
          href={`/atletas/${athlete.id}/editar`}
        >
          <PencilLine size={22} />
        </Link>
        <button title="Remover">
          <Trash className="text-red-500" size={22} />
        </button>
      </div>
    </div>
  )
}
