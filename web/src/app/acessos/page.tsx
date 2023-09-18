'use client'

import ComponentMenu from '@/components/Menu'

export default function Access() {
  return (
    <>
      <ComponentMenu />
      <div className="  bg-gray-200 flex min-h-screen flex-col p-20">
        <div className="flex items-center justify-between">
          <div className="flex text-2xl text-blue-950 gap-4">
            <h1>Listagem dos acessos</h1>
          </div>
        </div>
      </div>
    </>
  )
}
