<template>
  <div class="app-container">
    <h1 class="text-center page-title mb-4">Lottery Application</h1>

    <div class="container-fluid content-wrapper">
      <div class="row mb-4">
        <div class="col-lg-4">
          <WinnersBlock />
        </div>
        <div class="col-lg-8">
          <RegistrationBlock />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <ParticipantsBlock
            @edit-participant="openEditModal"
            @delete-participant="openDeleteModal"
          />
        </div>
      </div>
    </div> </div> <EditParticipantModal :show="showEditModal" :participant="selectedParticipant" @close="closeModals" />
  <DeleteConfirmModal :show="showDeleteModal" :participant="selectedParticipant" @close="closeModals" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Participant } from './types'
import RegistrationBlock from './components/participant/RegistrationBlock.vue'
import ParticipantsBlock from './components/participant/ParticipantsBlock.vue'
import WinnersBlock from './components/winner/WinnersBlock.vue'
import EditParticipantModal from './components/participant/EditParticipantModal.vue'
import DeleteConfirmModal from './components/participant/DeleteConfirmModal.vue'

const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedParticipant = ref<Participant | null>(null)

function openEditModal(participant: Participant) { selectedParticipant.value = participant; showEditModal.value = true; }
function openDeleteModal(participant: Participant) { selectedParticipant.value = participant; showDeleteModal.value = true; }
function closeModals() { showEditModal.value = false; showDeleteModal.value = false; selectedParticipant.value = null; }
</script>

<style lang="scss">
/* --- Глобальні Стилі --- */
html {
  height: 100%;
}

body {
  background: linear-gradient(135deg, #a88beb 0%, #f8ceec 100%);
  color: #495057;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  min-height: 100%;
  display: flex; /* Робимо body flex-контейнером */
}

#app {
    flex-grow: 1; /* #app займає всю доступну висоту body */
    display: flex; /* Робимо #app flex-контейнером */
    flex-direction: column; /* Вертикальний напрямок */
}

.app-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
  flex-grow: 1; /* Займає доступну висоту в #app */
  display: flex; /* Використовуємо flex для центрування */
  flex-direction: column; /* Вертикальний напрямок */
  align-items: center; /* Горизонтальне центрування */
  justify-content: center; /* Вертикальне центрування */
  box-sizing: border-box;
}

.page-title {
  color: #fff !important;
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 2rem !important;
  text-align: center; /* Переконуємося, що текст центрується */
}

/* --- Контейнер для основного контенту --- */
.content-wrapper {
   width: 100%;
   padding-right: 15px;
   padding-left: 15px;
   margin-right: auto;
   margin-left: auto;
   max-width: 1320px; /* Обмежуємо ширину контенту */
   box-sizing: border-box;
}


/* --- Стилі для Карток --- */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border: none;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  color: #495057;
  overflow: hidden;
}

.bg-dark { background-color: #fff !important; }
.text-white { color: #495057 !important; }

.card-body {
  flex: 1 1 auto;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
}
.card-title {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #343a40;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: left;
  flex-shrink: 0;
}

/* --- Сітка (Grid) --- */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
  align-items: stretch; /* Колонки в одному ряду мають однакову висоту */
}

.col-lg-4, .col-lg-8, .col-lg-12 {
  position: relative;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}
.col-lg-4 > .card,
.col-lg-8 > .card,
.col-lg-12 > .card,
.col-lg-4 > div > .card,
.col-lg-8 > div > .card,
.col-lg-12 > div > .card {
    flex-grow: 1;
}


/* Налаштування для десктопу (large) */
@media (min-width: 992px) {
  .col-lg-4 {
    flex: 0 0 auto;
    width: 33.33333%;
  }
  .col-lg-8 {
    flex: 0 0 auto;
    width: 66.66667%;
  }
   .col-lg-12 {
    flex: 0 0 auto;
    width: 100%;
  }
}

/* --- Загальні відступи --- */
.mb-3 { margin-bottom: 1rem !important; }
.mb-4 { margin-bottom: 1.5rem !important; }
.mt-3 { margin-top: 1rem !important; }
.mt-4 { margin-top: 1.5rem !important; }
.text-center { text-align: center; }

</style>