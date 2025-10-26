<template>
  <div class="form-group">
    <label v-if="label" :for="uuid">{{ label }}</label>
    <input
      :id="uuid"
      class="form-control"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      @input="onInput"
    />
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const uuid = ref(crypto.randomUUID())

withDefaults(defineProps<{
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  error?: string
  readonly?: boolean // Додано readonly
}>(), {
    type: 'text',
    readonly: false,
})

const emit = defineEmits(['update:modelValue'])
function onInput(event: Event) { emit('update:modelValue', (event.target as HTMLInputElement).value) }
</script>

<style lang="scss" scoped>
.form-group { margin-bottom: 1rem; }
label {
  display: block;
  margin-bottom: 0.3rem; /* Трохи менший відступ */
  color: #495057;
  font-size: 0.9rem; /* Менший шрифт */
  font-weight: 500;
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.6rem 0.75rem; /* Змінені відступи */
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none; /* remove default appearance */
  border-radius: 6px; /* Менше заокруглення */
  box-sizing: border-box;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

  &:focus {
      border-color: #a88beb; /* Фіолетовий при фокусі */
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(168, 139, 235, 0.25);
  }

  &[readonly] {
      background-color: #e9ecef; /* Сірий фон для readonly */
      opacity: 1;
  }

   /* Стиль для placeholder */
  &::placeholder {
      color: #adb5bd;
      opacity: 1;
  }
}
/* Стилі для поля дати */
input[type="date"] {
    position: relative;
}
/* Стилі для іконки календаря (може відрізнятися в браузерах) */
input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.6;
    cursor: pointer;
}


.error-message {
  color: #dc3545;
  font-size: 0.8rem; /* Ще менший шрифт */
  margin-top: 0.25rem;
}
</style>