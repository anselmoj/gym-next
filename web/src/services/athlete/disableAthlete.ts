interface IProps {
  id: number
  onSuccess(): void
}

export default async function disableAthlete({ id, onSuccess }: IProps) {
  const res = await fetch(`http://localhost:3334/gym-students/${id}/disable`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  })
  if (!res.ok) {
    throw new Error('Erro ao desabilitar o atleta')
  }
  onSuccess()
}
