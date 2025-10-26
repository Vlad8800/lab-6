<template>
  <div class="card participants-card shadow">
    <div class="card-header">
      <span>Participants</span>
      <span class="badge">{{ participants.length }}</span>
    </div>

    <div class="card-body">
      <SearchBar @filter-by-name="handleFilter" v-if="participants.length > 0"/>

      <ParticipantsTable
        v-if="filteredParticipants.length > 0"
        :participants="filteredParticipants"
        @edit-participant="emit('edit-participant', $event)"
        @delete-participant="emit('delete-participant', $event)"
      />
      <div v-else class="empty-state">
          <p v-if="participants.length === 0">No participants yet. Add your first participant!</p>
          <p v-else>No participants found matching your search.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useParticipantsStore } from '@/store/participants'
import type { Participant } from '@/types'
import SearchBar from '@/components/common/SearchBar.vue'
import ParticipantsTable from './ParticipantsTable.vue'

const emit = defineEmits(['edit-participant', 'delete-participant'])
const store = useParticipantsStore()
const { participants } = storeToRefs(store)
const filterText = ref('')

function handleFilter(newFilterText: string) { filterText.value = newFilterText.toLowerCase(); }

const filteredParticipants = computed(() => {
  if (!filterText.value) { return participants.value; }
  return participants.value.filter((p) =>
    p.firstName.toLowerCase().includes(filterText.value) ||
    p.lastName.toLowerCase().includes(filterText.value)
  )
})
</script>

<style lang="scss" scoped>
.participants-card {
   display: flex;
   flex-direction: column;
   height: 100%; /* Картка намагається зайняти всю доступну висоту */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  font-weight: 600;
  color: #495057;
  flex-shrink: 0;
}

.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: .75em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 50rem;
  background-color: #6c757d;
}

.card-body {
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Тіло картки займає решту висоти */
  overflow: hidden; /* Ховаємо те, що виходить за межі */
}

:deep(.search-bar) {
    margin-bottom: 1.5rem;
    flex-shrink: 0;
}

/* Контейнер таблиці розтягується і скролиться */
:deep(.table-responsive) {
    flex-grow: 1; /* Займає доступний простір */
    overflow-y: auto; /* Скрол, якщо таблиця завелика */
    min-height: 200px; /* Мінімальна висота */
}


.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
  color: #adb5bd;
  flex-grow: 1; /* Займає весь доступний простір */
  font-size: 1rem;
}

.empty-icon {
  width: 50px;
  height: 50px;
  opacity: 0.3;
  margin-bottom: 1rem;
}
</style>