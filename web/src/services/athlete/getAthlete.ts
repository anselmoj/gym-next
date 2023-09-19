export interface HttpResponse {
  name: string
  gender: string
  is_active: boolean
}

interface IProps {
  id: string
}

export default async function getAthlete({
  id,
}: IProps): Promise<HttpResponse> {
  const res = await fetch(`http://localhost:3334/gym-students/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
  if (!res.ok) {
    throw new Error('Erro ao resgatar o Id do atleta')
  }
  const data: HttpResponse = await res.json()
  return data
}
