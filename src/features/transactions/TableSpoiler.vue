<script setup lang="ts">
import { computed, ref } from 'vue'
import { isEmpty } from '@/shared/helpers/isEmpty.ts'
import MoneyWithLabel from '@/entities/transactions/MoneyWithLabel.vue'

type TransactionDTO = Components.Schemas.TransactionDTO

const props = defineProps<{
  data: TransactionDTO[]
  isFirst?: boolean
}>()

interface ILocalAmountData {
  income: number
  expense: number
  amount: number
}
interface ILocalComputedData extends ILocalAmountData {
  label: string
}

const calculatedData = computed<ILocalComputedData>(() => {
  const firstItem = props.data.at(0)
  if (props.data.length <= 0 || isEmpty(firstItem)) {
    return {
      label: '',
      income: 0,
      expense: 0,
      amount: 0,
    }
  }
  const firstItemCreateDate = new Date(firstItem.createdAt)
  const defaultAcc: ILocalAmountData = {
    income: 0,
    expense: 0,
    amount: 0,
  }
  const amountData: ILocalAmountData = props.data.reduce((acc, item) => {
    return {
      income: acc.income + item.income,
      expense: acc.expense + item.expense,
      amount: acc.amount + item.income - item.expense,
    }
  }, defaultAcc)

  return {
    ...amountData,
    label: firstItemCreateDate.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
    }),
  }
})

const isOpen = ref(props.isFirst)
const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="spoiler-wrapper">
    <div class="header" @click="toggle">
      <span class="label">{{ calculatedData.label }}</span>
      <MoneyWithLabel label="Расход" :value="calculatedData.expense" type="expense" />
      <MoneyWithLabel label="Доход" :value="calculatedData.income" type="income" />
      <MoneyWithLabel label="Итог" :value="calculatedData.amount" type="auto" />
    </div>
    <div v-if="isOpen" class="table">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.spoiler-wrapper {
  border: 1px solid var(--color-border);
}
.header {
  display: grid;
  grid-template-columns: 1fr repeat(3, 150px);
  gap: 10px;
  align-items: flex-end;
  padding: 10px;

  cursor: pointer;
}
.header:hover {
  background-color: var(--color-background-soft);
}
.table {
  border-top: 1px solid var(--color-border);
  padding-top: 10px;
}
.label {
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
}
</style>
