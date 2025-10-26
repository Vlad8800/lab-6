<template>
  <button class="base-button" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean // Додано disabled
}>(), {
  type: 'button',
  disabled: false,
})
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-block;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: #0d6efd; /* Синій колір */
  border: 1px solid #0d6efd;
  padding: 0.6rem 1.2rem; /* Збільшені відступи */
  font-size: 1rem;
  border-radius: 8px; /* Заокруглення */
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

  &:hover {
    color: #fff;
    background-color: #0b5ed7;
    border-color: #0a58ca;
  }

  &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
  }

  &:disabled {
      background-color: #0d6efd;
      border-color: #0d6efd;
      opacity: 0.65;
      cursor: not-allowed;
      pointer-events: none; /* Щоб hover не працював */
  }

  /* Стилі для червоної кнопки */
  &.btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    &:hover { background-color: #bb2d3b; border-color: #b02a37; }
    &:focus { box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5); }
    &:disabled { background-color: #dc3545; border-color: #dc3545; }
  }

  /* Стилі для сірої кнопки */
  &.btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
    &:hover { background-color: #5c636a; border-color: #565e64; }
    &:focus { box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5); }
     &:disabled { background-color: #6c757d; border-color: #6c757d; }
  }

   /* Додаткові стилі для маленьких кнопок */
  &.btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      border-radius: 6px;
  }
}
</style>