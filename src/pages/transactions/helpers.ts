import type { ICreateTransactionForm } from '@/features/transactions/types.ts'

const dateTransform = (date: string): string => {
  return date.split('T').at(0) ?? date
}

export const transformDTOToForm = (
  row: Components.Schemas.TransactionDto,
): ICreateTransactionForm => {
  return {
    ...row,
    description: row.description ?? undefined,
    createdAt: dateTransform(row.createdAt),
  }
}
