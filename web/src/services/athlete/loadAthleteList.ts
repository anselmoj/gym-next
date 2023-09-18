import { AthleteList } from '@/app/atletas/page'

interface HttpResponse {
  gender: string
  is_active: boolean
  name: string
  id: number
}

interface IProps {
  onSuccess(data: AthleteList[]): void
}

export default async function loadAthleteList({ onSuccess }: IProps) {
  const res = await fetch('http://localhost:3334/gym-students', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
  if (!res.ok) {
    throw new Error('Erro ao carregar a listagem de atletas')
  }
  const data: HttpResponse[] = await res.json()
  const dataParsed: AthleteList[] = data.map((item) => ({
    gender: item.gender,
    id: item.id,
    is_active: item.is_active,
    name: item.name,
  }))
  onSuccess(dataParsed)
}
