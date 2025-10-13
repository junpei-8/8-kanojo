<script setup lang="ts">
import BgImage from '../../assets/key-visual/bg.png';
import TextImage from '../../assets/key-visual/text.png';
import SdImage from '../../assets/key-visual/sd.png';
</script>

<template>
  <section class="key-visual">
    <img :src="BgImage" alt="Background" class="background" />
    <img :src="TextImage" alt="Title" class="title-text" />
    <img :src="SdImage" alt="Character" class="character" />
  </section>
</template>

<style scoped>
.key-visual {
  position: relative;
  width: 100%;
  height: 480px;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 50%;
  height: auto;
  z-index: 2;
}

.character {
  position: absolute;
  bottom: 0;
  right: 0;
  max-width: 25%;
  height: auto;
  z-index: 1;
}
</style>
