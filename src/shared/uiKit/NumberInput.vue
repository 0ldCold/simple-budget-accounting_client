<script setup lang="ts">
import WithLabel, { type IWithLabelProps } from '@/shared/uiKit/WithLabel.vue'

const props = defineProps<IWithLabelProps>()
defineOptions({
  inheritAttrs: false,
})

const modal = defineModel<number>()
</script>

<template>
  <WithLabel :label="props.label" :required="props.required">
    <input v-bind="$attrs" type="number" v-model="modal" />
  </WithLabel>
</template>

<style scoped></style>
