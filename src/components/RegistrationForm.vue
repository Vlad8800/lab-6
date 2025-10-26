<template>
  <div class="card form-card">
    <h2 class="form-title">REGISTER FORM</h2>
    <p class="form-subtitle">Please fill in all the fields.</p>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label>First Name</label>
        <input v-model="firstName" type="text" placeholder="Enter first name" />
      </div>

      <div class="form-group">
        <label>Last Name</label>
        <input v-model="lastName" type="text" placeholder="Enter last name" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Enter email" />
      </div>

      <div class="form-group">
        <label>Phone number</label>
        <input v-model="phone" type="tel" placeholder="Enter phone number" />
      </div>

      <div class="form-group">
        <label>Date of Birth</label>
        <input v-model="birthDate" type="date" />
      </div>

      <button class="btn-save">Save</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Participant } from '../types'

const emit = defineEmits<{
  'add-participant': [participant: Participant]
}>()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const birthDate = ref('')

const handleSubmit = () => {
  if (firstName.value && lastName.value && email.value && phone.value && birthDate.value) {
    emit('add-participant', {
      id: Date.now().toString(),
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      birthDate: birthDate.value
    })

    firstName.value = ''
    lastName.value = ''
    email.value = ''
    phone.value = ''
    birthDate.value = ''
  }
}
</script>

<style scoped>
.form-card {
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.form-subtitle {
  color: #777;
  font-size: 14px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}

input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  transition: 0.2s;
}

input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
}

.btn-save {
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-save:hover {
  background: #0069d9;
}
</style>
