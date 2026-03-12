import { TransactionsApi } from '@/shared/api/domains/transactions.ts'
import { instance } from '@/shared/api/instance.ts'

export const api = { transactions: new TransactionsApi(instance) }
