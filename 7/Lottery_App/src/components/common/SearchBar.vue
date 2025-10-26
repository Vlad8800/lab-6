<template>
  <div class="search-bar">
    <BaseInput
      v-model="searchText"
      label="Пошук за іменем"
      type="search"
      @input="emitFilter"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'

const searchText = ref('')

const emit = defineEmits(['filter-by-name'])

function emitFilter() {
  emit('filter-by-name', searchText.value)
}
</script>

<style lang="scss" scoped>
.search-bar {
  margin-bottom: 1rem;
}
</style>