import { FormDataProps } from '@/app/atletas/form'

interface HttpResponseRequest {
  name: string
  gender: string
  is_active: boolean
}

interface IProps {
  onSuccess(): void
  form: FormDataProps
}

export default async function createAthlete({ onSuccess, form }: IProps) {
  const body: HttpResponseRequest = {
    name: form.name,
    gender: form.gender,
    is_active: form.is_active,
  }
  const res = await fetch('http://localhost:3334/gym-students', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error('Erro ao adicionar um novo atleta')
  }
  onSuccess()
}
