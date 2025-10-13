<script setup>
import { ref, watch } from 'vue';
import { resetGame } from '../../store/game-store.js';
const selectedReasons = ref([]);

const handleCheckboxChange = (event) => {
  const value = event.target.value;
  if (event.target.checked) {
    selectedReasons.value.push(value);
  } else {
    const index = selectedReasons.value.indexOf(value);
    if (index > -1) {
      selectedReasons.value.splice(index, 1);
    }
  }
};

watch(
  selectedReasons,
  (newValue) => {
    if (newValue.length >= 3) {
      resetGame();
      window.scrollTo(0, 0);
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="container">
    <div class="lunch-box">
      <div class="box">
        <p>
          これまでのデートの回数は9回です。<br />
          あと一回のデートで手作り弁当をプレゼント！
        </p>
      </div>
    </div>
    <div class="cancel-reason">
      <form action="/cancel" method="post">
        <div class="cancel-reason-item">
          <label for="cancel-reason-1">
            <input
              type="checkbox"
              id="cancel-reason-1"
              name="cancel-reason"
              value="cast-dissatisfaction"
              @change="handleCheckboxChange"
            />担当のキャスト(彼女役)に満足ができなかった
          </label>
        </div>
        <div class="cancel-reason-item">
          <label for="cancel-reason-2">
            <input
              type="checkbox"
              id="cancel-reason-2"
              name="cancel-reason"
              value="service-dissatisfaction"
              @change="handleCheckboxChange"
            />対応・接客が期待と違った
          </label>
        </div>
        <div class="cancel-reason-item">
          <label for="cancel-reason-3">
            <input
              type="checkbox"
              id="cancel-reason-3"
              name="cancel-reason"
              value="conversation-mismatch"
              @change="handleCheckboxChange"
            />会話や雰囲気が合わなかった
          </label>
        </div>
        <div class="cancel-reason-item">
          <label for="cancel-reason-4">
            <input
              type="checkbox"
              id="cancel-reason-4"
              name="cancel-reason"
              value="staff-dissatisfaction"
              @change="handleCheckboxChange"
            />スタッフ(運営側)の対応に不満があった
          </label>
        </div>
        <div class="cancel-reason-item">
          <label for="cancel-reason-5">
            <input
              type="checkbox"
              id="cancel-reason-5"
              name="cancel-reason"
              value="price-high"
              @change="handleCheckboxChange"
            />料金が高いと感じた
          </label>
        </div>
        <div class="cancel-reason-item">
          <label for="cancel-reason-6">
            <input
              type="checkbox"
              id="cancel-reason-6"
              name="cancel-reason"
              value="option-price-high"
              @change="handleCheckboxChange"
            />オプション費用が高い
          </label>
        </div>
        <div class="cancel-reason-item">
          <label for="cancel-reason-7">
            <p>その他</p>
          </label>
          <textarea
            id="cancel-reason-7"
            name="cancel-reason"
            rows="10"
            cols="80"
          ></textarea>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.yes-button:hover {
  background-color: #bbdefb;
  border-color: #1976d2;
}

.no-button:hover {
  background-color: #ffcdd2;
  border-color: #d32f2f;
}

.cancel-reason {
  margin-top: 20px;
}

.cancel-reason-item {
  margin: 10px 0;
  text-align: left;
  display: block;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.cancel-reason-item label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.cancel-reason-item input[type='checkbox'] {
  margin-right: 10px;
  flex-shrink: 0;
}

.box {
  width: 800px;
  height: 100px;
  background-color: #ff99ff;
  border: 1px solid #000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0% {
    background-color: #ff99ff;
  }
  50% {
    background-color: #ffb3ff;
  }
  100% {
    background-color: #ff99ff;
  }
}
</style>
