<script setup lang="ts">
import { useCreateTransaction, useGetTransactionsList } from '@/shared/api/hooks'
import CreateModal from '@/features/transactions/CreateModal.vue'
import { ref } from 'vue'
import type { ICreateTransactionForm } from '@/features/transactions/types.ts'
import TablesContainer from '@/widgets/transactions/TablesContainer.vue'
import { isNotEmpty } from '@/shared/helpers/isNotEmpty.ts'
import { useUpdateTransaction } from '@/shared/api/hooks/transactions/useUpdateTransaction.ts'
import { transformDTOToForm } from '@/pages/transactions/helpers.ts'
import { useDeleteTransaction } from '@/shared/api/hooks/transactions/useDeleteTransaction.ts'
import ConfirmModal from '@/shared/uiKit/ConfirmModal.vue'

const showCreateModal = ref<ICreateTransactionForm | boolean>(false)

const { data } = useGetTransactionsList()

type IEditTransactionForm = ICreateTransactionForm & { id: Components.Schemas.TransactionDto['id'] }
const checkIsEditForm = (
  form: ICreateTransactionForm | IEditTransactionForm,
): form is IEditTransactionForm => isNotEmpty(form.id)

const { mutate: createTransactionRequest } = useCreateTransaction()
const createTransaction = (form: ICreateTransactionForm) => {
  createTransactionRequest(form, {
    onSuccess: () => {
      showCreateModal.value = false
    },
  })
}

const { mutate: editTransactionRequest } = useUpdateTransaction()
const editTransaction = (form: IEditTransactionForm) => {
  editTransactionRequest(
    {
      ...form,
      createdAt: form.createdAt ?? new Date().toISOString(),
    },
    {
      onSuccess: () => {
        showCreateModal.value = false
      },
    },
  )
}

const handleModalSubmit = (form: ICreateTransactionForm) => {
  if (checkIsEditForm(form)) {
    editTransaction(form)
  } else {
    createTransaction(form)
  }
}

const onEditRow = (row: Components.Schemas.TransactionDto) => {
  showCreateModal.value = transformDTOToForm(row)
}

const approveModal = ref<InstanceType<typeof ConfirmModal> | null>(null)
const approveDelete = (row: Components.Schemas.TransactionDto) => {
  return approveModal.value?.openModal({
    title: 'Удалить транзакцию',
    description: `Вы уверены, что хотите удалить транзакцию "${row.name}"?`,
    confirmText: 'Удалить',
  })
}

const { mutate: deleteTransactionRequest } = useDeleteTransaction()
const onDeleteRow = async (row: Components.Schemas.TransactionDto) => {
  if (!(await approveDelete(row))) return
  deleteTransactionRequest({ id: row.id })
}
</script>

<template>
  <div class="button-wrapper">
    <button @click="showCreateModal = true">Создать транзакцию</button>
    <CreateModal
      :show="showCreateModal"
      @close="showCreateModal = false"
      :on-submit="handleModalSubmit"
    />
  </div>
  <TablesContainer :data="data" :on-edit-row="onEditRow" :on-delete-row="onDeleteRow" />
  <ConfirmModal ref="approveModal" />
</template>

<style scoped>
.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
