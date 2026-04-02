import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { MutationKeys, QueryKeys } from '@/shared/api/queryKeys.ts'
import { api } from '@/shared/api/domains'

const moneyToCent = (val: number | undefined) => (typeof val === 'number' ? val * 100 : undefined)
const dateToISOString = (val: string | undefined) =>
  typeof val === 'string' && val.trim().length > 0 ? new Date(val.trim()).toISOString() : undefined

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [MutationKeys.TRANSACTIONS_CREATE],

    mutationFn: (body: Paths.CreateTransaction.RequestBody) => {
      const { income, expense, createdAt, ...another } = body
      return api.transactions.create({
        ...another,
        income: moneyToCent(income),
        expense: moneyToCent(expense),
        createdAt: dateToISOString(body.createdAt),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TRANSACTIONS_LIST] })
    },
  })
}
