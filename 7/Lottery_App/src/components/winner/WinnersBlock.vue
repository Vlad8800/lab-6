<template>
  <div class="card winners-card shadow">
    <div class="card-body">
      <h2 class="card-title">WINNERS</h2>

      <div class="winners-display mb-3">
        <BaseInput
          v-if="winners.length === 0"
          model-value=""
          placeholder="Winners will appear here"
          readonly
          class="winners-placeholder-input"
        />
        <ul class="list-unstyled winners-list" v-else>
          <li v-for="winner in winners" :key="winner.id">
            {{ winner.firstName }} {{ winner.lastName }}
          </li>
        </ul>
      </div>

      <BaseButton @click="pickWinner" :disabled="canPickWinner" class="new-winner-btn">
        New winner
      </BaseButton>

      <div v-if="pickError" class="error-message mt-2">{{ pickError }}</div>
      <p v-if="winners.length === 0 && !pickError" class="no-winners-text mt-2">
        No winners yet.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useParticipantsStore } from '@/store/participants'
import type { Participant } from '@/types'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'

const store = useParticipantsStore()
const { participants } = storeToRefs(store)

const winners = ref<Participant[]>([])
const pickError = ref('')

const canPickWinner = computed(() => {
  return participants.value.length === 0 ||
         participants.value.length === winners.value.length ||
         winners.value.length >= 3
})

function pickWinner() {
  pickError.value = ''
  if (winners.value.length >= 3) {
    pickError.value = 'Can select max 3 winners.'
    return
  }
  const availableParticipants = participants.value.filter(
    p => !winners.value.some(w => w.id === p.id)
  )
  if (availableParticipants.length === 0) {
    pickError.value = 'No available participants to pick from.'
    return
  }
  const randomIndex = Math.floor(Math.random() * availableParticipants.length)
  const newWinner = availableParticipants[randomIndex]
  winners.value.push(newWinner)
}
</script>

<style lang="scss" scoped>


.card-body {
  display: flex;
  flex-direction: column;
  padding: 1.5rem; /* Зменшуємо відступи */
}

.card-title {
  margin-bottom: 1rem;
  text-align: center; /* Центруємо заголовок */
}

.winners-display {
  flex-grow: 1; /* Дозволяє цій області рости */
  min-height: 80px; /* Мінімальна висота для області відображення */
  display: flex; /* Щоб інпут/список розтягувався */
  height: 200px;
}

.winners-placeholder-input {
  width: 100%;
  margin-bottom: 0;
  :deep(input) {
     background-color: #f8f9fa;
     border: 1px solid #dee2e6;
     color: #6c757d;
     border-radius: 6px;
     padding: 0.6rem 0.75rem;
     font-size: 0.9rem;
     height: 100%; /* Займає всю висоту .winners-display */
     text-align: center;
  }
  :deep(label) { display: none; }
}

.winners-list {
  width: 100%;
  list-style: none;
  padding: 0.75rem;
  margin: 0;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  height: 100%; /* Займає всю висоту .winners-display */
  overflow-y: auto; /* Скрол, якщо багато переможців */
  font-size: 0.9rem;
  color: #495057;

  li {
    background-color: #e9ecef;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.4rem;
    text-align: center;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.new-winner-btn {
  width: 100%; /* Кнопка на всю ширину */
  padding: 0.75rem 1rem;
  font-size: 1rem;
  flex-shrink: 0; /* Кнопка не стискається */
}

.no-winners-text,
.error-message {
    color: #adb5bd;
    font-size: 0.85rem;
    text-align: center;
    flex-shrink: 0; /* Не стискається */
}
.error-message {
  color: #dc3545;
}

.mb-3 { margin-bottom: 1rem !important; }
.mt-2 { margin-top: 0.5rem !important; }

</style>