import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { MutationKeys, QueryKeys } from '@/shared/api/queryKeys.ts'
import { api } from '@/shared/api/domains'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [MutationKeys.TRANSACTIONS_CREATE],
    mutationFn: api.transactions.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TRANSACTIONS_LIST] })
    },
  })
}
