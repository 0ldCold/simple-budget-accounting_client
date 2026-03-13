import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { MutationKeys, QueryKeys } from '@/shared/api/queryKeys.ts'
import { api } from '@/shared/api/domains'

const moneyToCent = (val: number | undefined) => (typeof val === 'number' ? val * 100 : undefined)

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [MutationKeys.TRANSACTIONS_CREATE],

    mutationFn: (body: Paths.CreateTransaction.RequestBody) => {
      const { income, expense, ...another } = body
      return api.transactions.create({
        ...another,
        income: moneyToCent(income),
        expense: moneyToCent(expense),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TRANSACTIONS_LIST] })
    },
  })
}
