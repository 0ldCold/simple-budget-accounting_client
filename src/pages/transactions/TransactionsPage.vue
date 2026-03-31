<script setup lang="ts">
import { useCreateTransaction, useGetTransactionsList } from '@/shared/api/hooks'
import CreateModal from '@/features/transactions/CreateModal.vue'
import { ref } from 'vue'
import type { ICreateTransactionForm } from '@/features/transactions/types.ts'
import TablesContainer from '@/widgets/transactions/TablesContainer.vue'

const showCreateModal = ref(false)

const { data } = useGetTransactionsList()

const { mutate: createTransactionRequest } = useCreateTransaction()
const createTransaction = (form: ICreateTransactionForm) => {
  createTransactionRequest(form, {
    onSuccess: () => {
      showCreateModal.value = false
    },
  })
}
</script>

<template>
  <div class="button-wrapper">
    <button @click="showCreateModal = true">Создать транзакцию</button>
    <CreateModal
      :show="showCreateModal"
      @close="showCreateModal = false"
      :on-create="createTransaction"
    />
  </div>
  <TablesContainer :data="data" />
</template>

<style scoped>
.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
