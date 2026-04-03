import { isStringNotEmpty } from '@/shared/helpers/isStringEmpty.ts'

const moneyToCent = (val: number | undefined) => (typeof val === 'number' ? val * 100 : undefined)
const dateToISOString = (val: string | undefined) =>
  typeof val === 'string' && val.trim().length > 0 ? new Date(val.trim()).toISOString() : undefined
const removeEmptyStr = (val: string | undefined): string | undefined =>
  isStringNotEmpty(val) ? val : undefined

export const transformCreateTransactionBody = (
  body: Components.Schemas.TransactionCreationParams & { id?: number },
): Components.Schemas.TransactionCreationParams => {
  const { income, expense, ...another } = body
  delete another.id
  return {
    ...another,
    income: moneyToCent(income),
    expense: moneyToCent(expense),
    createdAt: dateToISOString(body.createdAt),
    description: removeEmptyStr(body.description),
  }
}
