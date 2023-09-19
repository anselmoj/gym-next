import { PropsWithChildren } from 'react'

interface IProps {
  when: boolean
}

function ComponentIsVisible({ children, when }: PropsWithChildren<IProps>) {
  if (when) {
    return <>{children}</>
  }
  return null
}

export default ComponentIsVisible
