import { isStringNotEmpty } from '@/shared/helpers/isStringEmpty.ts'

const tryConvert =
  <TArgument, TResult>(convertFn: (arg: TArgument) => TResult) =>
  (data: TArgument | undefined): TResult | undefined => {
    if (data === undefined) return undefined
    return convertFn(data)
  }

const moneyToCent = (val: number): number => val * 100
const dateToISOString = (val: string): string => new Date(val.trim()).toISOString()
const dateToISOStringOptional = (val: string | undefined) =>
  isStringNotEmpty(val) ? dateToISOString(val) : undefined
const removeEmptyStr = (val: string | undefined): string | undefined =>
  isStringNotEmpty(val) ? val : undefined

export const transformCreateTransactionBody = (
  body: Components.Schemas.TransactionCreateDto & { id?: number },
): Components.Schemas.TransactionCreateDto => {
  const { income, expense, ...another } = body
  delete another.id
  return {
    ...another,
    income: tryConvert(moneyToCent)(income),
    expense: tryConvert(moneyToCent)(expense),
    createdAt: dateToISOStringOptional(body.createdAt),
    description: removeEmptyStr(body.description ?? undefined),
  }
}

export const transformUpdateTransactionBody = (
  body: Components.Schemas.TransactionUpdateDto & { id?: number },
): Components.Schemas.TransactionUpdateDto => {
  const { income, expense, ...another } = body
  delete another.id
  return {
    ...another,
    income: moneyToCent(income),
    expense: moneyToCent(expense),
    createdAt: dateToISOString(body.createdAt),
    description: removeEmptyStr(body.description ?? undefined),
  }
}
