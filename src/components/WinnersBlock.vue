<template>
  <div class="winner-container card">
    <div class="top-bar">
      <div class="tags">
        <span v-for="(winner, i) in winners" :key="i" class="tag">
          {{ winner.firstName }}
          <button @click="$emit('remove-winner', i)" class="remove">×</button>
        </span>
        <input type="text" placeholder="Winners" class="search-input" disabled />
      </div>
      <button
        class="btn-primary"
        :disabled="isButtonDisabled"
        @click="$emit('select-winner')"
      >
        New winner
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Participant } from '../types'

interface Props {
  winners: Participant[]
  participants: Participant[]
}

const props = defineProps<Props>()

defineEmits<{
  'select-winner': []
  'remove-winner': [index: number]
}>()

const isButtonDisabled = computed(
  () => props.winners.length >= 3 || props.participants.length === 0
)
</script>

<style scoped>
.winner-container {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.tag {
  background: #5bc0de;
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.remove {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  margin-left: 6px;
  cursor: pointer;
}

.search-input {
  border: 1px solid #ddd;
  padding: 6px;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
}

.btn-primary {
  background: #0d6efd;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background: #0b5ed7;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
