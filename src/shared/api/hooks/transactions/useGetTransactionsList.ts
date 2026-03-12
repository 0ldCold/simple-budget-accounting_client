import { useQuery } from '@tanstack/vue-query'
import { QueryKeys } from '@/shared/api/queryKeys.ts'
import { api } from '@/shared/api/domains'

export const useGetTransactionsList = () => {
  return useQuery({
    queryKey: [QueryKeys.TRANSACTIONS_LIST],
    queryFn: () => api.transactions.getList(),
  })
}
