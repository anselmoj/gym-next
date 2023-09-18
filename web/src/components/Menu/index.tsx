import Link from 'next/link'

export default function ComponentMenu() {
  return (
    <div className="h-16 px-6 relative w-full flex bg-blue-800">
      <header className="items-center flex gap-16 justify-center w-full">
        <Link href={'/atletas'}>
          <p className="text-white cursor-pointer">Atletas</p>
        </Link>
        <Link href={'/acessos'}>
          <p className="text-white cursor-pointer">Acessos</p>
        </Link>
      </header>
    </div>
  )
}
