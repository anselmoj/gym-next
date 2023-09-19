'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Athletes/header'
import List from '@/components/Athletes/list'
import loadAthleteList from '@/services/athlete/loadAthleteList'
import ComponentMenu from '@/components/Menu'
import AthleteEnable, { IAthleteEnableRefProps } from './enable'
import AthleteDisable, { IAthleteDisableRefProps } from './disable'

export interface AthleteList {
  gender: string
  is_active: boolean
  name: string
  id: number
}

export default function Athlete() {
  const [randomAthlete, setRandomAthlete] = useState<AthleteList[]>([])
  const athleteEnableRef = useRef<IAthleteEnableRefProps>(null)
  const athleteDisableRef = useRef<IAthleteDisableRefProps>(null)

  async function handleLoadAthleteList() {
    try {
      await loadAthleteList({
        onSuccess: (data) => setRandomAthlete(data),
      })
    } catch (error) {
      throw new Error('Erro ao carregar a listagem de atletas')
    }
  }

  const handleOpenEnableAthlete = useCallback((data: AthleteList) => {
    athleteEnableRef.current?.open(data)
  }, [])

  const handleOpenDisableAthlete = useCallback((data: AthleteList) => {
    athleteDisableRef.current?.open(data)
  }, [])

  useEffect(() => {
    handleLoadAthleteList()
  }, [])

  return (
    <>
      <ComponentMenu />
      <div className="bg-gray-200 flex min-h-screen flex-col p-20">
        <div className="flex items-center justify-between">
          <div className="flex text-2xl text-blue-950 gap-4">
            <h1>Listagem de atletas</h1>
          </div>

          <Link
            href={'/atletas/adicionar'}
            className="p-2 items-center flex justify-center w-32 bg-blue-500 rounded-lg"
          >
            Adicionar
          </Link>
        </div>

        <div className="p-6 mt-10">
          <Header />

          <div className="mt-2">
            {randomAthlete.map((athlete, index) => (
              <List
                openDisable={handleOpenDisableAthlete}
                openEnable={handleOpenEnableAthlete}
                addColorRow={index % 2 === 0}
                athlete={athlete}
                key={index}
              />
            ))}
          </div>
        </div>
        <AthleteEnable ref={athleteEnableRef} />
        <AthleteDisable ref={athleteDisableRef} />
      </div>
    </>
  )
}
