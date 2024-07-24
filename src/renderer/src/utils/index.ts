import { twMerge } from 'tailwind-merge'
import clsx, { ClassValue } from 'clsx'
const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'IST'
})
export const formatDateFormMs = (ms: number) => dateFormatter.format(ms)
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
