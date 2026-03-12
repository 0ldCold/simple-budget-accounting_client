<script setup lang="ts">
export interface IWithLabelProps {
  label: string
  required?: boolean
}
const props = defineProps<IWithLabelProps>()
</script>

<template>
  <label>
    <span :class="{ required: props.required }">{{ props.label }}</span>
    <slot />
  </label>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: column;
}
.required:after {
  content: '*';
  color: red;
}
</style>
