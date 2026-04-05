import { useQuery } from '@tanstack/vue-query'
import { QueryKeys } from '@/shared/api/queryKeys.ts'
import { api } from '@/shared/api/domains'

const centToMoney = (val: number) => {
  if (val === 0) {
    return 0
  }
  if (val < 100) {
    throw new Error('Invalid cent value')
  }
  return val / 100
}

export const useGetTransactionsList = () => {
  return useQuery({
    queryKey: [QueryKeys.TRANSACTIONS_LIST],
    queryFn: () => api.transactions.getList(),
    select: (data) =>
      data.map(
        (item): Components.Schemas.TransactionDto => ({
          ...item,
          income: centToMoney(item.income),
          expense: centToMoney(item.expense),
        }),
      ),
  })
}
