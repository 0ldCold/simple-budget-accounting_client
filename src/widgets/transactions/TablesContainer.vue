<script setup lang="ts">
import { computed } from 'vue'
import { isEmpty } from '@/shared/helpers/isEmpty.ts'
import TableSpoiler from '@/features/transactions/TableSpoiler.vue'
import TransactionsTable from '@/widgets/transactions/TransactionsTable.vue'

type TransactionDTO = Components.Schemas.TransactionDTO

const props = defineProps<{
  data: TransactionDTO[] | undefined
}>()
const data = computed(() => props.data ?? [])

const dataByMonth = computed(() => {
  const accDefault: TransactionDTO[][] = []
  return data.value.reduce((acc, item) => {
    const newRowDate = new Date(item.createdAt)
    const lastAccItem = acc.at(-1)
    if (isEmpty(lastAccItem)) {
      return [[item]]
    }
    const lastRow = lastAccItem.at(-1)
    if (isEmpty(lastRow)) {
      return [...acc, [item]]
    }

    const lastRowDate = new Date(lastRow.createdAt)
    if (
      lastRowDate.getFullYear() === newRowDate.getFullYear() &&
      lastRowDate.getMonth() === newRowDate.getMonth()
    ) {
      lastAccItem.push(item)
      return acc
    }

    return [...acc, [item]]
  }, accDefault)
})
</script>

<template>
  <div class="wrapper">
    <TableSpoiler
      v-for="(monthData, index) in dataByMonth"
      :key="index"
      :data="monthData"
      :isFirst="index === 0"
    >
      <TransactionsTable :data="monthData" />
    </TableSpoiler>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
