import { useMutation } from '@tanstack/vue-query'
import { MutationKeys } from '@/shared/api/queryKeys.ts'
import { api } from '@/shared/api/domains'

export const useCreateTransaction = () => {
  return useMutation({
    mutationKey: [MutationKeys.TRANSACTIONS_CREATE],
    mutationFn: api.transactions.create,
  })
}
