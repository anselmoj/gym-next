interface IProps {
  id: number
  onSuccess(): void
}

export default async function deleteAthlete({ id, onSuccess }: IProps) {
  const res = await fetch(`http://localhost:3334/gym-students/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Erro ao deletar o atleta')
  }
  onSuccess()
}
