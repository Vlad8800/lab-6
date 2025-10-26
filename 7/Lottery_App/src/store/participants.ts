import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Participant } from '@/types'

const STORAGE_KEY = 'lotteryParticipants'

export const useParticipantsStore = defineStore('participants', () => {
  // --- СТАН (STATE) ---
  const participants = ref<Participant[]>(
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  )

  // --- СПОСТЕРІГАЧ (WATCHER) ---
  watch(
    participants,
    (newParticipants) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newParticipants))
    },
    { deep: true }
  )

  // --- ДІЇ (ACTIONS) ---

  /**
   * Додає нового учасника
   */
  // 'Omit' тепер очікує нові поля з 'types/index.ts'
  function addParticipant(participant: Omit<Participant, 'id'>) {
    const newParticipant: Participant = {
      ...participant,
      id: crypto.randomUUID(),
    }
    participants.value.push(newParticipant)
  }

  /**
   * Оновлює існуючого учасника за його ID
   */
  function updateParticipant(id: string, updatedData: Partial<Participant>) {
    const index = participants.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      participants.value[index] = { ...participants.value[index], ...updatedData }
    }
  }

  /**
   * Видаляє учасника за його ID
   */
/**
 * Видаляє учасника за його ID
 */
function deleteParticipant(id: string) {
  // Правильна логіка: залишаємо тільки тих, чий ID НЕ співпадає
  participants.value = participants.value.filter((p) => p.id !== id)
}

  // --- ГЕТЕРИ (GETTERS) ---

  /**
   * Перевіряє, чи унікальний email
   */
  function isEmailUnique(email: string, currentId: string | null = null): boolean {
    return !participants.value.some(
      (p) => p.email.toLowerCase() === email.toLowerCase() && p.id !== currentId
    )
  }

  return {
    participants,
    addParticipant,
    updateParticipant,
    deleteParticipant,
    isEmailUnique,
  }
})