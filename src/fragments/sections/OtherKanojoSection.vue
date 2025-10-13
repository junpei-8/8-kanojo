<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  isAnomaly: {
    type: Boolean,
    required: true,
  },
});

const images = [
  '/img/other-kanojo/img1.png',
  '/img/other-kanojo/img2.png',
  '/img/other-kanojo/img3.png',
  '/img/other-kanojo/img4.png',
  '/img/other-kanojo/img5.png',
  '/img/other-kanojo/img6.png',
];

const position = ref(0);
const yOffset = ref(0);

let animationId;

const imageTotalWidth = 210;
const baseSpeed = 2;
const maxSpeed = 4;
const lowSpeed = 1; // 動作開始フェーズの低速

let currentSpeed = 0;

let phase = 'accel'; // 'accel', 'stop', 'wait', 'startMove'
let phaseFrame = 0;

// フェーズの長さ（60fps換算）
// ここをpropsでなんとか直す
const accelDuration = 105; // 1.75秒
const stopDuration = 15; // 0.25秒（揺れ付き停止）
const waitDuration = 90; // 1.5秒（停止完全待機）
const startMoveDuration = 150; // 2.5秒（低速移動フェーズ）

function easeIn(t) {
  return t * t;
}

function easeOut(t) {
  return t * (2 - t);
}

function animate() {
  phaseFrame++;

  switch (phase) {
    case 'accel': {
      let progress = phaseFrame / accelDuration;
      if (progress > 1) progress = 1;
      currentSpeed = baseSpeed + easeIn(progress) * (maxSpeed - baseSpeed);
      yOffset.value = 0;
      position.value -= currentSpeed;
      if (phaseFrame >= accelDuration) {
        phase = 'stop';
        phaseFrame = 0;
        currentSpeed = 0;
      }
      break;
    }
    case 'stop': {
      // 停止で上下揺れ
      yOffset.value = Math.sin(phaseFrame * 0.5) * 5;
      if (phaseFrame >= stopDuration) {
        phase = 'wait';
        phaseFrame = 0;
        yOffset.value = 0;
        currentSpeed = 0;
      }
      break;
    }
    case 'wait': {
      // 完全停止状態、揺れなし
      yOffset.value = 0;
      if (phaseFrame >= waitDuration) {
        phase = 'startMove';
        phaseFrame = 0;
        currentSpeed = 0;
      }
      break;
    }
    case 'startMove': {
      // 低速移動フェーズ（定速）
      currentSpeed = lowSpeed;
      yOffset.value = 0;
      position.value -= currentSpeed;
      if (phaseFrame >= startMoveDuration) {
        phase = 'accel';
        phaseFrame = 0;
      }
      break;
    }
  }

  // 画像無限ループのため位置リセット
  if (position.value <= -imageTotalWidth * images.length) {
    position.value = 0;
  }

  animationId = requestAnimationFrame(animate);
}

onMounted(() => {
  animate();
});

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId);
});
</script>

<template>
  <div class="container">
    <p class="highlight">もう一度チャンスをください</p>
    <p class="highlight">本サービスには他にもたくさんの彼女がいます！</p>

    <div
      v-if="props.isAnomaly"
      class="slider-container"
      :style="{ transform: `translateY(${yOffset}px)` }"
    >
      <div class="slider" :style="{ transform: `translateX(${position}px)` }">
        <img
          v-for="(img, idx) in [...images, ...images]"
          :key="idx"
          :src="img"
          class="slider-image"
          alt="画像"
        />
      </div>
    </div>
    <div v-else>
      <div class="slider animation">
        <img
          v-for="(img, idx) in [...images, ...images, ...images]"
          :key="idx"
          :src="img"
          class="slider-image"
          alt="画像"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  overflow: hidden;
  width: 100%;
}
.highlight {
  background-color: yellow;
  font-weight: bold;
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
}

.slider-container {
  width: 1260px; /* 210px × 6枚 */
  overflow: hidden;
  margin: 0 auto 30px;
  border: 1px solid #ccc;
  padding: 10px 0;
  will-change: transform;
}

.slider {
  display: flex;
  will-change: transform;
  gap: 10px;
  width: 1260px;
}

.slider-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #aaa;
}

@keyframes loop {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animation {
  animation: loop 20s linear infinite both;
}
</style>
