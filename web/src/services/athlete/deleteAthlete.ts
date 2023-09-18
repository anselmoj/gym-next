interface IProps {
  id: string
  onSuccess(): void
}

export default async function getAthlete({ id, onSuccess }: IProps) {
  const res = await fetch(`/${id}`, {
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
