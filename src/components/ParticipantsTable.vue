<template>
  <div class="card participants-card shadow-lg">
    <div class="card-header bg-gradient text-white d-flex align-items-center justify-content-between">
      <span>📋 Participants List</span>
      <span class="badge bg-light text-dark">{{ participants.length }}</span>
    </div>

    <div class="card-body p-0">
      <div v-if="participants.length === 0" class="empty-state">
        <div class="empty-state-icon">📝</div>
        <p>No participants yet. Add your first participant!</p>
      </div>

      <div v-else class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Birth Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(participant, index) in participants"
              :key="participant.id"
            >
              <td class="index-cell">{{ index + 1 }}</td>
              <td>{{ participant.firstName }}</td>
              <td>{{ participant.lastName }}</td>
              <td>{{ participant.email }}</td>
              <td>{{ participant.phone }}</td>
              <td>{{ formatDate(participant.birthDate) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Participant } from '../types'

interface Props {
  participants: Participant[]
}

defineProps<Props>()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.participants-card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}



.bg-gradient {
  background: linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%);
  font-weight: 600;
  font-size: 1.1rem;
}

.table {
  border-radius: 15px;
  overflow: hidden;
}

.table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.table th,
.table td {
  padding: 1rem;
  vertical-align: middle;
  border-bottom: 1px solid #f1f1f1;
}

.table tbody tr {
  transition: all 0.25s ease;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
  transform: scale(1.01);
}

.index-cell {
  font-weight: 600;
  color: #764ba2;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}
</style>
