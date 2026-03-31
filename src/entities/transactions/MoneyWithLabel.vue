<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: number
  type: 'income' | 'expense' | 'auto'
}>()

const numberFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })

const classType = computed(() => {
  if (props.type !== 'auto') return props.type
  return props.value >= 0 ? 'income' : 'expense'
})
</script>

<template>
  <div class="wrapper">
    <span class="label">{{ props.label }}</span>
    <span :class="['value', classType]">{{ numberFormat.format(props.value) }}</span>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
}
.label {
  font-size: 10px;
}
.value {
  font-size: 16px;
  line-height: 18px;
}
.income {
  color: green;
}
.expense {
  color: red;
}
</style>
