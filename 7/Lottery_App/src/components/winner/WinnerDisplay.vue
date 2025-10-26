<template>
  <li class="winner-item">
    <strong>{{ winner.firstName }} {{ winner.lastName }}</strong> ({{ winner.email }})
  </li>
</template>

<script setup lang="ts">
import type { Participant } from '@/types'

defineProps<{
  winner: Participant
}>()
</script>

<style lang="scss" scoped>
.winner-item {
  padding: 0.5rem;
  background-color: #495057;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
</style>