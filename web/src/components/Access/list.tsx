import { AccessList } from '@/app/acessos/page'

interface Props {
  access: AccessList
  addColorRow: boolean
}

export default function List({ access, addColorRow }: Props) {
  const bgColor = addColorRow ? 'bg-transparent' : 'bg-gray-300'

  return (
    <div
      className={`${bgColor} p-2 text-black mt-2 grid grid-cols-[1fr_1fr_10rem]`}
    >
      <p>{access.gym_student.name}</p>
      <p>{access.date_time}</p>
      <p>{access.type}</p>
    </div>
  )
}
