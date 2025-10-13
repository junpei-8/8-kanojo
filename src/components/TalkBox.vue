<template>
  <div class="talk-box">
    <slot />
  </div>
</template>

<style scoped>
.talk-box {
  position: absolute;
  bottom: 100px;
  left: 50%;
  width: 60%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 40px;
  border-radius: 12px;
  white-space: pre;
  text-align: left;
  max-width: 1000px;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.8;
}
</style>
