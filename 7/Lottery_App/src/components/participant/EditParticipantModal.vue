<template>
  <Modal :show="show" @close="close">
    <template #header>
      <h5 class="modal-title">Редагувати дані учасника</h5>
    </template>
    
    <template #body>
      <form @submit.prevent="handleUpdate">
        <BaseInput
          v-model="formData.firstName"
          label="Ім'я"
          type="text"
          :error="errors.firstName"
        />
        <BaseInput
          v-model="formData.lastName"
          label="Прізвище"
          type="text"
          :error="errors.lastName"
        />
        <BaseInput
          v-model="formData.email"
          label="Email"
          type="email"
          :error="errors.email"
        />
         <BaseInput
          v-model="formData.phone"
          label="Телефон"
          type="tel"
          :error="errors.phone"
        />
        <BaseInput
          v-model="formData.birthDate"
          label="Дата народження"
          type="date"
          :error="errors.birthDate"
        />
      </form>
    </template>
    
    <template #footer>
      <BaseButton @click="close" class="btn-secondary">Скасувати</BaseButton>
      <BaseButton @click="handleUpdate">Оновити дані</BaseButton>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Participant } from '@/types'
import { useParticipantsStore } from '@/store/participants'
import Modal from '@/components/common/Modal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps<{
  show: boolean
  participant: Participant | null
}>()

const emit = defineEmits(['close', 'update'])
const store = useParticipantsStore()

// Оновлюємо formData
const formData = reactive({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
})

// Оновлюємо errors
const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
})

// 'watch' заповнює форму новими даними
watch(() => props.participant, (newParticipant) => {
  if (newParticipant) {
    formData.id = newParticipant.id
    formData.firstName = newParticipant.firstName
    formData.lastName = newParticipant.lastName
    formData.email = newParticipant.email
    formData.phone = newParticipant.phone
    formData.birthDate = newParticipant.birthDate
    resetErrors()
  }
})

function resetErrors() {
  errors.firstName = ''
  errors.lastName = ''
  errors.email = ''
  errors.phone = ''
  errors.birthDate = ''
}

// Оновлюємо валідацію
function validate(): boolean {
  resetErrors()
  let isValid = true

  if (!formData.firstName.trim()) {
    errors.firstName = "Ім'я є обов'язковим"
    isValid = false
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Прізвище є обов'язковим"
    isValid = false
  }
  
  if (!formData.email.trim()) {
    errors.email = "Email є обов'язковим"
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Введіть коректний email'
    isValid = false
  } else if (!store.isEmailUnique(formData.email, formData.id)) {
    errors.email = 'Учасник з таким email вже існує'
    isValid = false
  }

  if (!formData.phone.trim()) {
    errors.phone = "Телефон є обов'язковим"
    isValid = false
  } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
    errors.phone = 'Введіть коректний телефон'
    isValid = false
  }

  if (!formData.birthDate) {
    errors.birthDate = "Дата народження є обов'язковою"
    isValid = false
  } else {
     const selectedDate = new Date(formData.birthDate)
     const today = new Date()
     today.setHours(0, 0, 0, 0)
     if (selectedDate >= today) {
       errors.birthDate = 'Дата народження не може бути в майбутньому'
       isValid = false
     }
  }
  
  return isValid
}

function handleUpdate() {
  if (validate()) {
    store.updateParticipant(formData.id, { ...formData })
    close()
  }
}

function close() {
  emit('close')
}
</script>