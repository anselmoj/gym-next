interface IProps {
  id: number
  onSuccess(): void
}

export default async function enableAthlete({ id, onSuccess }: IProps) {
  const res = await fetch(`http://localhost:3334/gym-students/${id}/enable`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  })
  if (!res.ok) {
    throw new Error('Erro ao habilitar o atleta')
  }
  onSuccess()
}
