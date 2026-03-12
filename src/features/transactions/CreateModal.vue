<script setup lang="ts">
import { ref, toValue, watchEffect } from 'vue'
import ModalWindow from '@/shared/uiKit/ModalWindow.vue'
import type { ICreateTransactionForm } from '@/features/transactions/types.ts'
import TextInput from '@/shared/uiKit/TextInput.vue'
import NumberInput from '@/shared/uiKit/NumberInput.vue'
import TextArea from '@/shared/uiKit/TextArea.vue'

const props = defineProps<{ show: boolean; onCreate?: (form: ICreateTransactionForm) => void }>()
const emit = defineEmits(['close'])

const defaultForm: ICreateTransactionForm = {
  name: '',
  income: 0,
  expense: 0,
  description: '',
}
const form = ref<ICreateTransactionForm>({
  ...defaultForm,
})
watchEffect(() => {
  if (!toValue(props.show)) {
    form.value = { ...defaultForm }
  }
})

const close = () => emit('close')
const handleSubmit = () => {
  props.onCreate?.(toValue(form))
}
</script>

<template>
  <Teleport to="body">
    <ModalWindow :show="props.show" @close="close" @keydown.enter="handleSubmit">
      <template #header>
        <h2>Создание транзакции</h2>
      </template>

      <div class="form">
        <TextInput label="Название" type="text" v-model="form.name" required />
        <div class="row">
          <NumberInput label="Доход" type="number" v-model="form.income" required />
          <NumberInput label="Расход" type="number" v-model="form.expense" required />
        </div>
        <TextArea label="Описание" rows="3" v-model="form.description" @keydown.stop />
      </div>

      <template #footer>
        <div class="button-wrapper">
          <button @click="handleSubmit">Создать</button>
        </div>
      </template>
    </ModalWindow>
  </Teleport>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.row {
  display: flex;
  gap: 10px;
}
.button-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
