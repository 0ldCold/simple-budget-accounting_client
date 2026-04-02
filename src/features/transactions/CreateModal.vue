<script setup lang="ts">
import { computed, watch } from 'vue'
import ModalWindow from '@/shared/uiKit/ModalWindow.vue'
import type { ICreateTransactionForm } from '@/features/transactions/types.ts'
import TextInput from '@/shared/uiKit/TextInput.vue'
import NumberInput from '@/shared/uiKit/NumberInput.vue'
import TextArea from '@/shared/uiKit/TextArea.vue'
import DateInput from '@/shared/uiKit/DateInput.vue'
import { useRegleSchema } from '@regle/schemas'
import { z } from 'zod'
import { calcCountNumberInDecimalPart } from '@/shared/helpers/calcCountNumberInDecimalPart.ts'

const props = defineProps<{ show: boolean; onCreate?: (form: ICreateTransactionForm) => void }>()
const emit = defineEmits(['close'])

const defaultForm: ICreateTransactionForm = {
  name: '',
  income: 0,
  expense: 0,
  description: '',
  createdAt: '',
}

const { r$ } = useRegleSchema(
  { ...defaultForm },
  z.object({
    name: z.string().min(3).max(50),
    expense: z
      .number()
      .nonnegative()
      .refine((val) => calcCountNumberInDecimalPart(val) <= 2, {
        error: 'Должно иметь не более 2-х знаков после запятой',
      }),
    income: z
      .number()
      .nonnegative()
      .refine((val) => calcCountNumberInDecimalPart(val) <= 2, {
        error: 'Должно иметь не более 2-х знаков после запятой',
      }),
    description: z.string().max(255),
    createdAt: z.string().optional(),
  }),
)
watch(
  () => props.show,
  (isShow) => {
    if (!isShow) {
      r$.$reset({ toInitialState: true })
    }
  },
)

const isAmountsNotEmpty = computed(
  () => (r$.income.$value ?? 0) > 0 || (r$.expense.$value ?? 0) > 0,
)

const close = () => emit('close')
const handleSubmit = async () => {
  const { valid, data } = await r$.$validate()
  if (!valid) return
  if (!isAmountsNotEmpty.value) {
    return
  }

  props.onCreate?.(data)
}
</script>

<template>
  <Teleport to="body">
    <ModalWindow :show="props.show" @close="close" @keydown.enter="handleSubmit">
      <template #header>
        <h2>Создание транзакции</h2>
      </template>

      <div class="form">
        <TextInput label="Название" required v-model="r$.$value.name" :error="r$.name.$error" />
        <div>
          <div class="row">
            <NumberInput
              label="Расход"
              labelClass="expenseText"
              required
              v-model="r$.$value.expense"
              :error="r$.expense.$error"
            />
            <NumberInput
              label="Доход"
              labelClass="incomeText"
              required
              v-model="r$.$value.income"
              :error="r$.income.$error"
            />
          </div>
          <div
            v-if="!isAmountsNotEmpty && r$.income.$dirty && r$.expense.$dirty"
            class="error-text"
          >
            Нужно заполнить как минимум одно поле: Расход или Доход
          </div>
        </div>
        <DateInput label="Дата" v-model="r$.$value.createdAt" :error="r$.createdAt.$error" />
        <TextArea
          label="Контакт"
          rows="3"
          v-model="r$.$value.description"
          :error="r$.description.$error"
          @keydown.stop
        />
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
.error-text {
  color: red;
  font-size: 12px;
}
.incomeText {
  color: green;
}
.expenseText {
  color: #c53030;
}
</style>
