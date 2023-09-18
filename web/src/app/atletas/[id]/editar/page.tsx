'use client'

import { ArrowUUpLeft } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import Form, { FormRefProps } from '../../form'
import editAthlete from '@/services/athlete/editAthlete'
import getAthlete, { HttpResponse } from '@/services/athlete/getAthlete'

export default function EditAthlete({ params }: { params: { id: string } }) {
  const router = useRouter()
  const formRef = useRef<FormRefProps>(null)
  const [infoAthlete, setInfoAthlete] = useState<HttpResponse>(
    {} as HttpResponse,
  )

  function handleGoBack() {
    router.back()
  }

  const handleGetAthlete = useCallback(async () => {
    try {
      const data = await getAthlete({
        id: params.id,
      })
      setInfoAthlete(data)
    } catch (error) {
      throw new Error('Erro ao encontrar o id do atleta')
    }
  }, [params.id])

  async function handleEditAthlete() {
    try {
      if (formRef.current) {
        const formValues = formRef.current?.getValues()
        await editAthlete({
          onSuccess: () => router.replace('/atletas'),
          id: params.id,
          form: formValues,
        })
      }
    } catch (error) {
      throw new Error('Erro ao editar o atleta')
    }
  }

  useEffect(() => {
    handleGetAthlete()
  }, [handleGetAthlete])

  return (
    <div className=" bg-gray-200 flex min-h-screen flex-col p-20">
      <div className="flex items-center text-2xl text-blue-950 gap-4">
        <button onClick={handleGoBack}>
          <ArrowUUpLeft size={20} />
        </button>
        <h1>Editar atleta</h1>
      </div>

      <div className="justify-center flex mt-24">
        <Form
          initialData={{
            gender: infoAthlete.gender,
            is_active: infoAthlete.is_active,
            name: infoAthlete.name,
          }}
          onSubmit={handleEditAthlete}
          ref={formRef}
        />
      </div>
    </div>
  )
}
