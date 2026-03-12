<script setup lang="ts">
import TransactionsTable from '@/widgets/transactions/TransactionsTable/TransactionsTable.vue'
import { useGetTransactionsList } from '@/shared/api/hooks'

const { data } = useGetTransactionsList()
</script>

<template>
  <TransactionsTable :data="data" />
</template>

<style scoped></style>
