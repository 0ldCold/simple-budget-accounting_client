import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { MutationKeys, QueryKeys } from '@/shared/api/queryKeys.ts'
import { api } from '@/shared/api/domains'
import { transformCreateTransactionBody } from '@/shared/api/hooks/transactions/helpers.ts'

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [MutationKeys.TRANSACTIONS_UPDATE],

    mutationFn: (
      body: Paths.EditTransaction.RequestBody & Paths.EditTransaction.PathParameters,
    ) => {
      return api.transactions.edit(body.id, transformCreateTransactionBody(body))
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TRANSACTIONS_LIST] })
    },
  })
}
