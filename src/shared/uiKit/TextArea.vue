<script setup lang="ts">
import WithLabel, { type IWithLabelProps } from '@/shared/uiKit/WithLabel.vue'

const props = defineProps<IWithLabelProps & { error?: boolean }>()
defineOptions({
  inheritAttrs: false,
})

const modal = defineModel<string>()
</script>

<template>
  <WithLabel :label="props.label" :required="props.required">
    <textarea v-bind="$attrs" v-model="modal" :class="{ error: props.error }" />
  </WithLabel>
</template>

<style scoped>
textarea {
  resize: vertical;
  line-height: normal;
}
.error {
  border-color: red;
}
</style>
