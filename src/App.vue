<template>
  <div class="container app-container">
    <h1 class="text-center text-white mb-4"> Lottery Application</h1>

    <div
      v-if="showSuccess"
      class="alert alert-success success-alert alert-dismissible fade show"
      role="alert"
    >
      <strong>Success!</strong> Participant added successfully!
      <button
        type="button"
        class="btn-close"
        @click="showSuccess = false"
      ></button>
    </div>

    <div class="row">
      <div class="col-lg-4 mb-4">
        <WinnersBlock
          :winners="winners"
          :participants="participants"
          @select-winner="selectRandomWinner"
          @remove-winner="removeWinner"
        />
      </div>

      <div class="col-lg-8 mb-4">
        <RegistrationForm @add-participant="addParticipant" />
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <ParticipantsTable :participants="participants" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WinnersBlock from './components/WinnersBlock.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import ParticipantsTable from './components/ParticipantsTable.vue'
import type { Participant } from './types'

const participants = ref<Participant[]>([])
const winners = ref<Participant[]>([])
const showSuccess = ref(false)

const addParticipant = (participant: Participant): void => {
  participants.value.push(participant)
  showSuccess.value = true

  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const selectRandomWinner = (): void => {
  const availableParticipants = participants.value.filter(
    (p) => !winners.value.find((w) => w.id === p.id)
  )

  if (availableParticipants.length === 0 || winners.value.length >= 3) {
    return
  }

  const randomIndex = Math.floor(Math.random() * availableParticipants.length)
  const winner = availableParticipants[randomIndex]
  winners.value.push(winner)
}

const removeWinner = (index: number): void => {
  winners.value.splice(index, 1)
}
</script>