'use client'

import Header from '@/components/Access/header'
import List from '@/components/Access/list'
import ComponentMenu from '@/components/Menu'
import loadAccessList from '@/services/access/loadAccessList'
import { useCallback, useEffect, useRef, useState } from 'react'
import AccessForm, { IAccessFormRefProps } from './form'
import createAccess from '@/services/access/createAccess'

export interface AccessList {
  date_time: string
  gym_student: {
    id: number
    name: string
  }
  id: number
  type: string
}

export default function Access() {
  const [randomAccess, setRandomAccess] = useState<AccessList[]>([])
  const formRef = useRef<IAccessFormRefProps>(null)

  const handleOpenAccessForm = useCallback(() => {
    formRef.current?.open()
  }, [])

  async function handleLoadAccess() {
    try {
      await loadAccessList({
        onSuccess: (data) => setRandomAccess(data),
      })
    } catch (error) {
      throw new Error('Erro ao carregar a listagem de acessos')
    }
  }

  async function handleCreateAccess() {
    try {
      if (formRef.current) {
        const formValues = formRef.current.getValue()
        console.log('formValues', formValues)

        await createAccess({
          onSuccess: () => handleLoadAccess(),
          form: formValues,
        })
      }
    } catch (error) {
      console.log('error', error)
      throw new Error('Erro ao criar listagem de acesso')
    }
  }

  useEffect(() => {
    handleLoadAccess()
  }, [])
  return (
    <>
      <ComponentMenu />
      <div className="  bg-gray-200 flex min-h-screen flex-col p-20">
        <div className="flex items-center justify-between">
          <div className="flex text-2xl text-blue-950 gap-4">
            <h1>Listagem dos acessos</h1>
          </div>

          <button
            className="p-2 items-center flex justify-center w-32 bg-blue-500 rounded-lg"
            onClick={handleOpenAccessForm}
          >
            Liberar atleta
          </button>
          <AccessForm onSubmit={handleCreateAccess} ref={formRef} />
        </div>

        <div className="p-6 mt-10">
          <Header />

          <div className="mt-2">
            {randomAccess.map((access, index) => (
              <List addColorRow={index % 2 === 0} access={access} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
