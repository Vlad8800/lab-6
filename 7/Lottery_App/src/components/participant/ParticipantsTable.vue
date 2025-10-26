<template>
  <div class="table-responsive">
    <table class="table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th @click="setSortKey('firstName')" class="sortable-header">
            Ім'я
            <span v-if="sortKey === 'firstName'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th>Прізвище</th>
          <th>Email</th>
          <th>Телефон</th>
          <th @click="setSortKey('birthDate')" class="sortable-header">
            Дата народження
            <span v-if="sortKey === 'birthDate'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="participant in sortedParticipants" :key="participant.id">
          <td>{{ participant.firstName }}</td>
          <td>{{ participant.lastName }}</td>
          <td>{{ participant.email }}</td>
          <td>{{ participant.phone }}</td>
          <td>{{ participant.birthDate }}</td>
          <td>
            <div class="action-buttons">
              <BaseButton
                @click="emit('edit-participant', participant)"
                class="btn-sm"
              >
                Редагувати
              </BaseButton>
              <BaseButton
                @click="emit('delete-participant', participant)"
                class="btn-danger btn-sm"
              >
                Видалити
              </BaseButton>
            </div>
          </td>
        </tr>
        <tr v-if="sortedParticipants.length === 0">
          <td colspan="6" class="text-center">Немає учасників</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Participant } from '@/types'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps<{
  participants: Participant[]
}>()

const emit = defineEmits(['edit-participant', 'delete-participant'])

// --- Логіка Сортування ---
type SortKey = 'firstName' | 'birthDate'
const sortKey = ref<SortKey>('firstName')
const sortDirection = ref<'asc' | 'desc'>('asc')

function setSortKey(key: SortKey) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

const sortedParticipants = computed(() => {
  return [...props.participants].sort((a, b) => {
    let valA, valB

    // Оновлюємо логіку сортування
    if (sortKey.value === 'firstName') {
      valA = a.firstName.toLowerCase()
      valB = b.firstName.toLowerCase()
    } else {
      valA = a.birthDate
      valB = b.birthDate
    }

    if (valA < valB) {
      return sortDirection.value === 'asc' ? -1 : 1
    }
    if (valA > valB) {
      return sortDirection.value === 'asc' ? 1 : -1
    }
    return 0
  })
})
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 400px;
  overflow-y: auto;
}
.table {
  width: 100%;
  margin-bottom: 0;
}
.action-buttons {
  display: flex;
  gap: 0.5rem;
}
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
.sortable-header {
  cursor: pointer;
  user-select: none;
  &:hover {
    color: #fff;
  }
  span {
    font-size: 0.8em;
  }
}
</style>