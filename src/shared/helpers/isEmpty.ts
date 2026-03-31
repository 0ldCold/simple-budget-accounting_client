import { isNotEmpty } from '@/shared/helpers/isNotEmpty.ts'

export const isEmpty = <T>(data: T | undefined | null): data is undefined | null =>
  !isNotEmpty(data)
