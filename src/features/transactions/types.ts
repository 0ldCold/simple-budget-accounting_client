export interface ICreateTransactionForm extends Omit<
  Components.Schemas.TransactionCreateDto,
  'income' | 'expense'
> {
  id?: Components.Schemas.TransactionDto['id']
  name: string
  income: number | null
  expense: number | null
  description?: string
  createdAt?: string
}
