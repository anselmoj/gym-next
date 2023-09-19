import { AccessList } from '@/app/acessos/page'

interface HttpResponse {
  list: {
    date_time: string
    gym_student: {
      id: number
      name: string
    }
    id: number
    type: string
  }[]
}

interface IProps {
  onSuccess(data: AccessList[]): void
}

export default async function loadAccessList({ onSuccess }: IProps) {
  const res = await fetch('http://localhost:3334/access', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
  if (!res.ok) {
    throw new Error('Erro ao carregar os acessos')
  }
  const data: HttpResponse = await res.json()
  console.log('data', data)
  const dataParsed: AccessList[] = data.list.map((item) => ({
    date_time: item.date_time,
    id: item.id,
    type: item.type,
    gym_student: {
      id: item.gym_student.id,
      name: item.gym_student.name,
    },
  }))
  onSuccess(dataParsed)
}
