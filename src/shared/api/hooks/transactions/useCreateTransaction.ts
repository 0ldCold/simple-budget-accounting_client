import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { MutationKeys, QueryKeys } from '@/shared/api/queryKeys.ts'
import { api } from '@/shared/api/domains'
import { transformCreateTransactionBody } from '@/shared/api/hooks/transactions/helpers.ts'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [MutationKeys.TRANSACTIONS_CREATE],

    mutationFn: (body: Paths.TransactionControllerCreate.RequestBody) => {
      return api.transactions.create(transformCreateTransactionBody(body))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TRANSACTIONS_LIST] })
    },
  })
}
