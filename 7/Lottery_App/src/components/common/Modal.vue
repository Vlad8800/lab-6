<template>
  <Transition name="modal-fade">
    <div
      v-if="show"
      class="modal-backdrop"
      @click.self="close"
      @keydown.esc.stop="close"  tabindex="-1"               role="dialog"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <header class="modal-header">
            <slot name="header">
              <h5 class="modal-title">Заголовок</h5>
            </slot>
            <BaseButton class="btn-close" @click="close">×</BaseButton>
          </header>
          <section class="modal-body">
            <slot name="body">
              Тіло модального вікна
            </slot>
          </section>
          <footer class="modal-footer">
            <slot name="footer">
              <BaseButton @click="close">Закрити</BaseButton>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
// 3. Переконайтеся, що імпортовано watch та nextTick
import { watch, nextTick } from 'vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['close'])

// 4. Логіка для встановлення фокусу при відкритті вікна
watch(() => props.show, (newVal) => {
  if (newVal) {
    // nextTick чекає, поки Vue оновить DOM і вікно з'явиться
    nextTick(() => {
        // Знаходимо фон модального вікна в DOM
        const backdropElement = document.querySelector('.modal-backdrop') as HTMLElement | null;
        if (backdropElement) {
             backdropElement.focus(); // Встановлюємо фокус на фон
        }
    });
  }
})

function close() {
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-dialog {
  max-width: 500px;
  width: 90%;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
 background-color: #fff; /* Білий фон модалки */
  color: #333; /* Темний текст */
  border: 1px solid rgba(0, 0, 0, 0.2); /* Світла рамка */
  border-radius: 0.3rem;
  outline: 0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border-bottom: 1px solid #495057;
}

.modal-title {
  margin: 0;
  line-height: 1.5;
  font-size: 1.25rem;
}

.btn-close {
  padding: 0.25rem 0.5rem;
  margin: -0.5rem -0.5rem -0.5rem auto;
  background: transparent;
  border: 0;
  font-size: 1.5rem;
  color: #fff;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #495057;
  gap: 0.5rem; // Проміжок між кнопками
}

/* Анімації для Transition */
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from .modal-dialog,
.modal-fade-leave-to .modal-dialog {
  transform: translateY(-20px);
}

.modal-fade-enter-active .modal-dialog,
.modal-fade-leave-active .modal-dialog {
  transition: all 0.2s ease;
}
</style>