<template>
  <form @submit.prevent="handleSubmit" @keydown.enter.prevent="handleSubmit" class="registration-form">
    <BaseInput
      v-model="formData.firstName"
      label="First Name"
      placeholder="Enter first name"
      type="text"
      :error="errors.firstName"
    />
    <BaseInput
      v-model="formData.lastName"
      label="Last Name"
      placeholder="Enter last name"
      type="text"
      :error="errors.lastName"
    />
    <BaseInput
      v-model="formData.email"
      label="Email"
      placeholder="Enter email"
      type="email"
      :error="errors.email"
    />
    <BaseInput
      v-model="formData.phone"
      label="Phone number"
      placeholder="Enter phone number"
      type="tel"
      :error="errors.phone"
    />
    <BaseInput
      v-model="formData.birthDate"
      label="Date of Birth"
      type="date"
      :error="errors.birthDate"
    />

    <div v-if="submitError" class="error-message mb-3">{{ submitError }}</div>

    <BaseButton type="submit">
      Save
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useParticipantsStore } from '@/store/participants'

const store = useParticipantsStore()

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
})

const submitError = ref('')

function validate(): boolean {
  // Reset errors
  errors.firstName = ''
  errors.lastName = ''
  errors.email = ''
  errors.phone = ''
  errors.birthDate = ''
  submitError.value = ''
  let isValid = true

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required"
    isValid = false
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required"
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required"
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  } else if (!store.isEmailUnique(formData.email)) {
    errors.email = 'Participant with this email already exists'
    isValid = false
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required"
    isValid = false
  } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
    // Basic phone validation, adjust regex if needed for specific formats
    errors.phone = 'Please enter a valid phone number'
    isValid = false
  }

  if (!formData.birthDate) {
    errors.birthDate = "Date of Birth is required"
    isValid = false
  } else {
    const selectedDate = new Date(formData.birthDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Compare dates only
    if (selectedDate >= today) {
      errors.birthDate = 'Date of Birth cannot be in the future'
      isValid = false
    }
  }

  return isValid
}

function handleSubmit() {
  if (validate()) {
    try {
      store.addParticipant({ ...formData })
      // Clear form
      formData.firstName = ''
      formData.lastName = ''
      formData.email = ''
      formData.phone = ''
      formData.birthDate = ''
    } catch (error) {
      console.error("Error adding participant:", error); // Log error for debugging
      submitError.value = 'Failed to add participant. Please try again.'
    }
  }
}
</script>

<style lang="scss" scoped>
.registration-form {
   .base-button {
      width: 100%; /* Кнопка на всю ширину */
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      font-size: 1rem;
      margin-top: 0.5rem; /* Додаємо невеликий відступ зверху */
   }
}

.error-message {
  color: #dc3545;
  font-size: 0.8rem;
  text-align: center; /* Центруємо загальну помилку */
}
.mb-3 {
  margin-bottom: 1rem;
}
</style>