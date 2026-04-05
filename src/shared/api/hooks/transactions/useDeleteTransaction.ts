import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { MutationKeys, QueryKeys } from '@/shared/api/queryKeys.ts'
import { api } from '@/shared/api/domains'

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [MutationKeys.TRANSACTIONS_DELETE],

    mutationFn: ({ id }: Paths.TransactionControllerRemove.PathParameters) => {
      return api.transactions.delete(id)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TRANSACTIONS_LIST] })
    },
  })
}
