import { format } from 'date-fns'

interface IDateOptions {
  defaultValue?: string
}

function date(value?: string | null, options?: IDateOptions): string {
  if (!value) {
    return options?.defaultValue ?? ''
  }
  const dateFormatted = format(new Date(value), 'dd/MM/yyyy - HH:mm')

  return dateFormatted
}

export default date
