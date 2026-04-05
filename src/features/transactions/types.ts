export interface ICreateTransactionForm extends Components.Schemas.TransactionCreateDto {
  id?: Components.Schemas.TransactionDto['id']
  name: string
  income: number
  expense: number
  description?: string
  createdAt?: string
}
