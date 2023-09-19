import { FormDataProps } from '@/app/atletas/form'
interface HttpResponseRequest {
  name: string
  gender: string
}

interface IProps {
  onSuccess(): void
  form: FormDataProps
  id: string
}

export default async function editAthlete({ onSuccess, form, id }: IProps) {
  const body: HttpResponseRequest = {
    name: form.name,
    gender: form.gender,
  }
  const res = await fetch(`http://localhost:3334/gym-students/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error('Erro ao editar o atleta')
  }
  onSuccess()
}
