<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Line電話通知の状態管理
const showLineCall = ref(false);
const lineCallTimer = ref(null);
const callState = ref('idle'); // 'idle', 'incoming', 'connected', 'ended'
const showCallScreen = ref(false);

// 音声再生の管理
const ringtoneAudio = ref(null);
const recordingAudio = ref(null);
const isPlayingRingtone = ref(false);
const isPlayingRecording = ref(false);

// 固定画像の管理
const profileSection = ref(null);

// 音声ファイルの初期化
const initializeAudio = () => {
  // 着信音の初期化
  ringtoneAudio.value = new Audio('/audio/line.mp3');
  ringtoneAudio.value.loop = true;
  ringtoneAudio.value.volume = 0.7;

  // 録音内容の初期化
  recordingAudio.value = new Audio('/audio/yakusoku.mp3');
  recordingAudio.value.volume = 0.8;
};

// 着信音を再生する関数
const playRingtone = () => {
  if (ringtoneAudio.value && !isPlayingRingtone.value) {
    ringtoneAudio.value.play();
    isPlayingRingtone.value = true;
  }
};

// 着信音を停止する関数
const stopRingtone = () => {
  if (ringtoneAudio.value && isPlayingRingtone.value) {
    ringtoneAudio.value.pause();
    ringtoneAudio.value.currentTime = 0;
    isPlayingRingtone.value = false;
  }
};

// 録音内容を再生する関数
const playRecording = () => {
  if (recordingAudio.value && !isPlayingRecording.value) {
    recordingAudio.value.play();
    isPlayingRecording.value = true;

    // 録音終了時の処理
    recordingAudio.value.onended = () => {
      isPlayingRecording.value = false;
    };
  }
};

// ランダムなタイミングでLine電話を表示する関数
const scheduleLineCall = () => {
  // 1秒から6秒の間でランダムな時間を生成
  const randomTime = Math.floor(Math.random() * 5000) + 1000; // 1000ms = 1秒, 6000ms = 6秒

  lineCallTimer.value = setTimeout(() => {
    showLineCall.value = true;
    callState.value = 'incoming';
    playRingtone(); // 着信音を再生

    // 3秒後に通知を非表示にする（自動拒否）
    setTimeout(() => {
      if (callState.value === 'incoming') {
        declineCall();
      }
    }, 3000);
  }, randomTime);
};

// 通話を拒否する関数
const declineCall = () => {
  stopRingtone(); // 着信音を停止
  showLineCall.value = false;
  showCallScreen.value = false;
  callState.value = 'idle';
  // 再度ランダムなタイミングでスケジュール
  scheduleLineCall();
};

// 通話に応答する関数
const acceptCall = () => {
  stopRingtone(); // 着信音を停止
  showLineCall.value = false;
  showCallScreen.value = true;
  callState.value = 'connected';

  // 録音内容を再生
  playRecording();

  // 録音終了後に通話終了
  if (recordingAudio.value) {
    recordingAudio.value.onended = () => {
      isPlayingRecording.value = false;
      endCall();
    };
  } else {
    // 録音ファイルが読み込めない場合のフォールバック
    setTimeout(() => {
      endCall();
    }, 10000);
  }
};

// 通話を終了する関数
const endCall = () => {
  // 録音再生を停止
  if (recordingAudio.value && isPlayingRecording.value) {
    recordingAudio.value.pause();
    recordingAudio.value.currentTime = 0;
    isPlayingRecording.value = false;
  }

  showCallScreen.value = false;
  callState.value = 'ended';

  // 少し待ってから再度ランダムなタイミングでスケジュール
  setTimeout(() => {
    callState.value = 'idle';
    scheduleLineCall();
  }, 2000);
};

// スクロールイベントの処理（固定画像のため不要だが、将来の拡張のために残す）
const handleScroll = () => {
  // 固定画像のため、スクロール処理は不要
};

// コンポーネントがマウントされた時に開始
onMounted(() => {
  initializeAudio();
  scheduleLineCall();
});

// コンポーネントがアンマウントされる時にタイマーと音声をクリア
onUnmounted(() => {
  if (lineCallTimer.value) {
    clearTimeout(lineCallTimer.value);
  }
  stopRingtone();
  if (recordingAudio.value && isPlayingRecording.value) {
    recordingAudio.value.pause();
  }
});
</script>

<template>
  <div>
    <div class="fixed-rental">
      <img
        src="/img/kanojo/shizuko.png"
        alt="レンタル彼女"
        class="fixed-image"
      />
    </div>

    <!-- Line電話通知 -->
    <div v-if="showLineCall" class="line-call-notification">
      <div class="line-call-content">
        <div class="line-call-header">
          <div class="line-logo">📞</div>
          <div class="line-info">
            <div class="caller-name">レンタル彼女</div>
            <div class="call-type">着信</div>
          </div>
        </div>
        <div class="line-call-actions">
          <button class="decline-btn" @click="declineCall">拒否</button>
          <button class="accept-btn" @click="acceptCall">応答</button>
        </div>
      </div>
    </div>

    <!-- Line通話画面 -->
    <div v-if="showCallScreen" class="call-screen">
      <div class="call-screen-content">
        <div class="caller-info">
          <!-- <img src="/images/rental.png" alt="レンタル彼女" class="caller-avatar"></img> -->
          <div class="caller-details">
            <div class="caller-name">レンタル彼女</div>
            <div class="call-status">通話中</div>
            <div class="call-timer">00:10</div>
          </div>
        </div>

        <div class="audio-visualizer">
          <div class="audio-bars">
            <div class="bar" v-for="n in 5" :key="n"></div>
          </div>
          <div class="recording-indicator">
            <span class="recording-dot"></span>
            通話中...
          </div>
        </div>

        <div class="call-controls">
          <button class="mute-btn" title="ミュート">
            <span>🔇</span>
          </button>
          <button class="end-call-btn" @click="endCall" title="通話終了">
            <span>📞</span>
          </button>
          <button class="speaker-btn" title="スピーカー">
            <span>🔊</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  color: blue;
  font-size: 20px;
  text-align: center;
}
.test {
  color: red;
  font-size: 16px;
  text-align: center;
}

/* Line電話通知のスタイル */
.line-call-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #00c300, #00a000);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 8px 25px rgba(0, 195, 0, 0.3);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  min-width: 280px;
  color: white;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.line-call-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.line-call-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.line-logo {
  font-size: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.line-info {
  flex: 1;
}

.caller-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 2px;
}

.call-type {
  font-size: 12px;
  opacity: 0.9;
}

.line-call-actions {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.decline-btn,
.accept-btn {
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.decline-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.decline-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.accept-btn {
  background: white;
  color: #00c300;
}

.accept-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* Line通話画面のスタイル */
.call-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.call-screen-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.caller-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.caller-avatar {
  font-size: 80px;
  background: linear-gradient(135deg, #00c300, #00a000);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 195, 0, 0.3);
}

.caller-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.caller-details .caller-name {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.call-status {
  font-size: 16px;
  color: #00c300;
  margin: 0;
}

.call-timer {
  font-size: 18px;
  font-weight: bold;
  color: #ccc;
  margin: 0;
}

.audio-visualizer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.audio-bars {
  display: flex;
  gap: 4px;
  align-items: end;
  height: 40px;
}

.bar {
  width: 6px;
  background: linear-gradient(to top, #00c300, #00a000);
  border-radius: 3px;
  animation: audioWave 1.5s ease-in-out infinite;
}

.bar:nth-child(1) {
  animation-delay: 0s;
  height: 20px;
}
.bar:nth-child(2) {
  animation-delay: 0.1s;
  height: 30px;
}
.bar:nth-child(3) {
  animation-delay: 0.2s;
  height: 40px;
}
.bar:nth-child(4) {
  animation-delay: 0.3s;
  height: 25px;
}
.bar:nth-child(5) {
  animation-delay: 0.4s;
  height: 35px;
}

@keyframes audioWave {
  0%,
  100% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1);
  }
}

.recording-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #00c300;
}

.recording-dot {
  width: 8px;
  height: 8px;
  background: #ff4444;
  border-radius: 50%;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.call-controls {
  display: flex;
  gap: 30px;
  align-items: center;
}

.mute-btn,
.end-call-btn,
.speaker-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mute-btn:hover,
.speaker-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.end-call-btn {
  background: #ff4444;
  width: 70px;
  height: 70px;
}

.end-call-btn:hover {
  background: #ff6666;
  transform: scale(1.05);
}

/* メインコンテンツのスタイル */
.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

/* プロフィールセクションのスタイル */
.profile-section {
  margin: 40px 0;
  padding: 30px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid #00c300;
}

.profile-content {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.profile-image-container {
  flex-shrink: 0;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #00c300;
  box-shadow: 0 4px 15px rgba(0, 195, 0, 0.3);
  transition: all 0.3s ease;
  object-fit: cover;
  top: 0;
}

.profile-image:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 195, 0, 0.4);
}

.profile-info {
  flex: 1;
}

.profile-name {
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
  border-bottom: 3px solid #00c300;
  padding-bottom: 10px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
}

.detail-label {
  font-weight: bold;
  color: #666;
  min-width: 60px;
}

.detail-value {
  color: #333;
  background: rgba(0, 195, 0, 0.1);
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 14px;
}

.profile-description {
  background: white;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #00c300;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.profile-description p {
  margin: 0;
  color: #555;
  font-style: italic;
  line-height: 1.6;
}

.contract-section,
.warning-section,
.action-section,
.terms-section {
  margin: 40px 0;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contract-section h2,
.warning-section h2,
.action-section h2,
.terms-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 20px;
  border-bottom: 2px solid #00c300;
  padding-bottom: 10px;
}

.contract-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contract-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: white;
  border-radius: 5px;
  border-left: 4px solid #00c300;
}

.contract-item .label {
  font-weight: bold;
  color: #666;
}

.contract-item .value {
  color: #333;
}

.warning-list {
  list-style: none;
  padding: 0;
}

.warning-list li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  color: #d32f2f;
  font-weight: 500;
}

.warning-list li:last-child {
  border-bottom: none;
}

.reason-textarea {
  width: 100%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  margin-bottom: 20px;
}

.reason-textarea:focus {
  outline: none;
  border-color: #00c300;
}

.button-group {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.cancel-btn,
.terminate-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #4caf50;
  color: white;
}

.cancel-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.terminate-btn {
  background: #f44336;
  color: white;
}

.terminate-btn:hover {
  background: #da190b;
  transform: translateY(-2px);
}

.links {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.link {
  color: #00c300;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border: 1px solid #00c300;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.link:hover {
  background: #00c300;
  color: white;
}

/* 固g/kanojo/shizuko.pngのスタイル */
.fixed-rental {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 1500;
  pointer-events: none; /* クリックイベントを無効化 */
}

.fixed-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 3px solid #00c300;
  transition: all 0.3s ease;
  object-fit: cover;
}

.fixed-image:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 195, 0, 0.4);
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .main-content {
    padding: 10px;
  }

  .profile-section {
    margin: 20px 0;
    padding: 20px;
  }

  .profile-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }

  .profile-image {
    width: 120px;
    height: 120px;
  }

  .profile-name {
    font-size: 24px;
  }

  .detail-item {
    justify-content: center;
  }

  .contract-section,
  .warning-section,
  .action-section,
  .terms-section {
    margin: 20px 0;
    padding: 20px;
  }

  .button-group {
    flex-direction: column;
  }

  .fixed-rental {
    right: 10px;
  }

  .fixed-image {
    width: 80px;
    height: 80px;
  }
}
</style>
