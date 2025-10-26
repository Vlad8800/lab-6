<template>
  <div class="card bg-dark text-white shadow">
    <div class="card-body">
      <h2 class="card-title">REGISTER FORM</h2>
      <p class="card-subtitle mb-4">Please fill in all the fields.</p>
      <RegistrationForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import RegistrationForm from './RegistrationForm.vue'
</script>

<style lang="scss" scoped>
/* Стилі для блоку реєстрації */

.card-body {
  padding: 1.5rem 2rem;
}

.card-title {
    margin-bottom: 0.5rem; /* Зменшуємо відступ під заголовком */
}

.card-subtitle {
    font-size: 0.9rem;
    color: #6c757d; /* Сірий колір */
    margin-top: -0.5rem; /* Піднімаємо ближче до заголовка */
}

.mb-4 {
    margin-bottom: 1.5rem !important;
}
</style>