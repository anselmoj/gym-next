'use client'

import { ArrowUUpLeft } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import Form, { FormRefProps } from '../form'
import { useRef } from 'react'
import createAthlete from '@/services/athlete/createAthlete'

export default function CreateAthlete() {
  const router = useRouter()
  const formRef = useRef<FormRefProps>(null)

  function handleGoBack() {
    router.back()
  }

  async function handleCreateAthlete() {
    try {
      if (formRef.current) {
        const formValues = formRef.current.getValues()
        await createAthlete({
          form: formValues,
          onSuccess: () => router.replace('/atletas'),
        })
      }
    } catch (error) {
      throw new Error('Erro ao adicionar um novo atleta')
    }
  }

  return (
    <div className=" bg-gray-200 flex min-h-screen flex-col p-20">
      <div className="flex items-center text-2xl text-blue-950 gap-4">
        <button onClick={handleGoBack}>
          <ArrowUUpLeft size={20} />
        </button>
        <h1>Adicionar atleta</h1>
      </div>

      <div className="justify-center flex mt-24">
        <Form onSubmit={handleCreateAthlete} ref={formRef} />
      </div>
    </div>
  )
}
