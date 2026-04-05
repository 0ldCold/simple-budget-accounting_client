<script setup lang="ts">
import { ref } from 'vue'

interface IConfirmModalContent {
  title: string
  description?: string
  confirmText?: string
}
const confirmTextDefault = 'Подтвердить'

const isOpen = ref(false)

const title = ref<IConfirmModalContent['title']>()
const description = ref<IConfirmModalContent['description']>()
const confirmText = ref<Required<IConfirmModalContent>['confirmText']>(confirmTextDefault)

let resolvePromise: (value: PromiseLike<boolean> | boolean) => void

const openModal = (content: IConfirmModalContent): Promise<boolean> => {
  title.value = content.title
  description.value = content.description
  confirmText.value = content.confirmText ?? confirmTextDefault

  isOpen.value = true

  return new Promise((resolve) => {
    resolvePromise = resolve
  })
}

const handleUserInput = (value: boolean) => {
  if (!resolvePromise) return

  resolvePromise(value)

  isOpen.value = false
}
const approve = () => handleUserInput(true)
const decline = () => handleUserInput(false)

defineExpose({ openModal })
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-background" @mousedown.self="decline">
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <div class="buttons-wrapper">
          <button @click="approve">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </Teleport>
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
.modal-content {
  background: var(--color-background);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
.buttons-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
h2 {
  &:empty {
    display: none;
  }
}
p {
  &:empty {
    display: none;
  }
}
</style>
