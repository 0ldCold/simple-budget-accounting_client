<script setup lang="ts">
import WithLabel, { type IWithLabelProps } from '@/shared/uiKit/WithLabel.vue'
import { computed } from 'vue'

const props = defineProps<IWithLabelProps & { error?: boolean }>()
defineOptions({
  inheritAttrs: false,
})

const modelValue = defineModel<number | null>({
  default: null,
})

const displayValue = computed(() => {
  return modelValue.value === null || modelValue.value === undefined ? '' : modelValue.value
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  modelValue.value = value === '' ? null : Number(value)
}
</script>

<template>
  <WithLabel :label="props.label" :required="props.required" :class="$attrs.labelClass">
    <input
      v-bind="$attrs"
      type="number"
      :value="displayValue"
      @input="handleInput"
      :class="{ error: props.error }"
    />
  </WithLabel>
</template>

<style scoped>
.error {
  border-color: red;
  &:focus,
  &:hover {
    border-color: red;
  }
}
</style>
