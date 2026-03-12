<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits(['close'])
defineOptions({
  inheritAttrs: false,
})

const close = () => {
  emit('close')
}
</script>

<template>
  <div v-if="props.show" class="modal-background" @click.self="close">
    <div class="wrapper" v-bind="$attrs">
      <div class="header">
        <slot name="header" />
      </div>
      <div class="content">
        <slot />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  align-items: center;
  justify-content: center;
}

.wrapper {
  background: var(--color-background);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
.header {
  &:empty {
    display: none;
  }
}
.content {
  flex: 1;
}
.footer {
  &:empty {
    display: none;
  }
}
</style>
