import { FormDataProps } from '@/app/acessos/form'

interface HttpResponseRequest {
  gym_student_id: number
  type: string
}

interface IProps {
  onSuccess(): void
  form: FormDataProps
}

export default async function createAccess({ onSuccess, form }: IProps) {
  const body: HttpResponseRequest = {
    gym_student_id: form.gym_student_id,
    type: form.type,
  }
  console.log('body', body)
  const res = await fetch('http://localhost:3334/access', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error('Erro ao liberar atleta')
  }
  onSuccess()
}
