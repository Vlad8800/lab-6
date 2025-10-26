<template>
  <Modal :show="show" @close="close">
    <template #header>
      <h5 class="modal-title">Підтвердження видалення</h5>
    </template>
    
    <template #body>
      <p v-if="participant">
        Ви дійсно бажаєте видалити учасника
        <strong>"{{ participant.firstName }} {{ participant.lastName }}"</strong> 
        ({{ participant.email }})?
      </p>
      <p v-else>
        Ви дійсно бажаєте видалити цього учасника?
      </p>
    </template>
    
    <template #footer>
      <BaseButton @click="close" class="btn-secondary">Ні</BaseButton>
      <BaseButton @click="handleConfirm" class="btn-danger">Так</BaseButton>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { Participant } from '@/types'
import { useParticipantsStore } from '@/store/participants'
import Modal from '@/components/common/Modal.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps<{
  show: boolean
  participant: Participant | null
}>()

const emit = defineEmits(['close'])
const store = useParticipantsStore()

function handleConfirm() {
  if (props.participant) {
    store.deleteParticipant(props.participant.id)
  }
  close()
}

function close() {
  emit('close')
}
</script>