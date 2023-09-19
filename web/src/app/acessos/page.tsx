'use client'

import Header from '@/components/Access/header'
import List from '@/components/Access/list'
import ComponentMenu from '@/components/Menu'
import loadAccessList from '@/services/access/loadAccessList'
import { useEffect, useState } from 'react'

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

  async function handleLoadAccess() {
    try {
      await loadAccessList({
        onSuccess: (data) => setRandomAccess(data),
      })
    } catch (error) {
      throw new Error('Erro ao carregar a listagem de acessos')
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
            <h1>Acessos</h1>
          </div>
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
