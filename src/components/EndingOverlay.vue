<script setup>

</script>

<template>
  <div class="ending-overlay">
    <div class="ending-content ending-1">
      俺はついにみさきと別れることが出来た。<br />
      正直好きという気持ちがないかと言われれば嘘になる。
    </div>
    <div class="ending-content ending-2">
      でも俺は本当の彼女を作らないと。<br />
      そも思って解約ページに進んだはずなのに<br />
      なぜか解約ページから前に進まなかった気がする、、、
    </div>
    
  </div>
</template>

<style scoped>
.ending-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.8;
}

.ending-content {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  opacity: 0;
}

.ending-1 {
  animation: show 5s ease-in-out forwards;
}

.ending-2 {
  animation: show 5s 5s ease-in-out forwards;
}

@keyframes show {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
