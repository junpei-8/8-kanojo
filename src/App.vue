<script setup>
import { gameState } from './store/game-store.js'
import AdBanner from './components/AdBanner.vue'
import CancelPage from './components/CancelPage.vue'
import OpeningOverlay from './components/OpeningOverlay.vue'
import EndingOverlay from './components/EndingOverlay.vue'
</script>

<template>
  <!-- <AdBanner />
  <CancelPage v-if="gameState.gameStarted" />
  <OpeningOverlay v-if="!gameState.gameStarted" /> -->
  <EndingOverlay />
</template>

<style scoped>
</style>
