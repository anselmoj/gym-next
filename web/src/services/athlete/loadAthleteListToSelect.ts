interface HttpResponse {
  list: {
    name: string
    id: number
  }[]
}

interface IAthleteList {
  label: string
  value: number
}

interface Props {
  onSuccess(data: IAthleteList[]): void
}

export default async function loadAthleteListToSelect({ onSuccess }: Props) {
  try {
    const res = await fetch('http://localhost:3334/gym-students', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
    if (!res.ok) {
      throw new Error('Erro ao carregar a listagem de atletas')
    }
    const data: HttpResponse = await res.json()
    const dataParsed: IAthleteList[] = data.list.map((item) => ({
      label: item.name,
      value: item.id,
    }))
    onSuccess(dataParsed)
  } catch (error) {
    console.log('error', error)
  }
}
