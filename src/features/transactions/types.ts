export interface ICreateTransactionForm {
  id?: Components.Schemas.TransactionDTO['id']
  name: string
  income: number
  expense: number
  description?: string
  createdAt?: string
}
