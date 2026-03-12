<script setup lang="ts">
import WithLabel, { type IWithLabelProps } from '@/shared/uiKit/WithLabel.vue'

const props = defineProps<IWithLabelProps & { error?: boolean }>()
defineOptions({
  inheritAttrs: false,
})

const modal = defineModel<number | string>()
</script>

<template>
  <WithLabel :label="props.label" :required="props.required" :class="$attrs.labelClass">
    <input v-bind="$attrs" type="number" v-model="modal" :class="{ error: props.error }" />
  </WithLabel>
</template>

<style scoped>
.error {
  border-color: red;
}
</style>
