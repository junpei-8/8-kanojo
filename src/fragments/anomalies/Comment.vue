<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// --- パーティクルここから ---
// パーティクル生成
const particles = ref([])
const particleCount = 50
const createParticles = () => {
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: getRandomColor()
    })
  }
}

// ランダムな色を取得
const getRandomColor = () => {
  const colors = ['#ffffff', '#f0f8ff', '#e6f3ff', '#d1ecf1', '#b8e6b8']
  return colors[Math.floor(Math.random() * colors.length)]
}

// パーティクルアニメーション
const animateParticles = () => {
  setInterval(() => {
    particles.value.forEach(particle => {
      particle.y += particle.speed
      
      // 画面下に落ちたら上から再スタート
      if (particle.y > window.innerHeight) {
        particle.y = -10
        particle.x = Math.random() * window.innerWidth
      }
      
      // 軽やかな左右の揺れ
      particle.x += Math.sin(particle.y * 0.01) * 0.5
    })
  }, 50)
}

// --- パステルゲーミング背景ここから ---
const currentHue = ref(0)
const backgroundColor = ref('#FF0000')
let intervalId = null

// HSL to RGB 変換のためのヘルパー関数
const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/**
 * HSL (色相、彩度、輝度) を RGB に変換する
 */
const hsl2rgb = (h, s, l) => {
  s /= 100;
  l /= 100;

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const h_norm = h / 360;

    r = hue2rgb(p, q, h_norm + 1 / 3);
    g = hue2rgb(p, q, h_norm);
    b = hue2rgb(p, q, h_norm - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * RGBから#ffffff形式へ変換する
 */
const RGB2bgColor = (r, g, b) => {
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

/**
 * HSL計算に基づき背景色を自動的に変更する
 */
const startBackgroundAnimation = () => {
  // 200ミリ秒ごとに色相を15度ずつ進める
  intervalId = setInterval(() => {
    // 色相を15度インクリメント
    currentHue.value = (currentHue.value + 30) % 360;

    // HSLからRGBを取得 (彩度100%, 輝度50%で固定)
    const rgb = hsl2rgb(currentHue.value, 70, 90);

    // RGBをHEXコードに変換し、Vueのデータにセット
    backgroundColor.value = RGB2bgColor(rgb.r, rgb.g, rgb.b);
    document.body.style.backgroundColor = backgroundColor.value;
  }, 200);
}

// --- 流れるコメントここから ---
// コメント配列
const comments = ref([
  'ちょっと、何言ってるの？',
  '冗談だよね？',
  'ねぇ、冗談でしょ？',
  '別れるなんて許さないから',
  '絶対、別れないからね',
  'どこにも行かせないよ',
  '私のそばにいて',
  '私がいないと、あなたダメになっちゃうよ？',
  'ねぇ、私が必要でしょ？',
  '私じゃなきゃダメなの！',
  'わかってるよね？',
  'わかってないなら、分からせてあげる',
  'ね、もう一回言って？',
  '「別れない」って',
  '早く言ってよ！',
  'ねぇ、無視しないでよ！',
  '怖い？',
  '大丈夫、愛してるよ',
  '愛してるから、離さない',
  'ずっと一緒だよ',
  '永遠にね',
])

// 流れるコメントの配列
const flowingComments = ref([])

// ランダムなコメントを取得
const getRandomComment = () => {
  return comments.value[Math.floor(Math.random() * comments.value.length)]
}

// コメントを生成する関数
const createFlowingComment = () => {
  const comment = {
    id: Date.now() + Math.random(),
    text: getRandomComment(),
    x: window.innerWidth + 100, // 右端から開始
    y: Math.random() * (window.innerHeight - 100) + 50, // ランダムな高さ
    speed: 7,
    size: 22,
    color: '#222',
    opacity: Math.random() * 0.8 + 0.6
  }
  flowingComments.value.push(comment)
}

// コメントアニメーション
const animateComments = () => {
  setInterval(() => {
    flowingComments.value.forEach((comment, index) => {
      comment.x -= comment.speed
      
      // 左端に到達したら削除
      if (comment.x < -200) {
        flowingComments.value.splice(index, 1)
      }
    })
  }, 50)
}

// コメント生成の間隔
const startCommentFlow = () => {
  setInterval(() => {
    createFlowingComment()
  }, 2000) // 2秒ごとに新しいコメントを生成
}



// コンポーネントマウント時に実行
onMounted(() => {
  // --- パーティクル ---
  createParticles()
  animateParticles()

  // --- パステルゲーミング背景 ---
  startBackgroundAnimation()

  // --- 流れるコメント ---
  animateComments()
  startCommentFlow()
})

// コンポーネントが破棄される前に、setIntervalをクリアしてメモリリークを防ぐ
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
})
</script>

<template>
  <div id="app">
    <!-- パーティクル要素 -->
    <div 
      v-for="particle in particles" 
      :key="particle.id"
      class="particle"
      :style="{
        left: particle.x + 'px',
        top: particle.y + 'px',
        width: particle.size + 'px',
        height: particle.size + 'px',
        backgroundColor: particle.color,
        opacity: particle.opacity
      }"
    ></div>
    <!-- パーティクル要素ここまで -->

    <!-- 流れるコメント要素 -->
    <div 
      v-for="comment in flowingComments" 
      :key="comment.id"
      class="flowing-comment"
      :style="{
        left: comment.x + 'px',
        top: comment.y + 'px',
        fontSize: comment.size + 'px',
        color: comment.color,
        opacity: comment.opacity
      }"
    >
      {{ comment.text }}
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #eee;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 300;
}

.sections-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
  margin-left: 8.33%;
  margin-right: 8.33%;
}

section {
  background: white;
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-left: 4px solid #667eea;
}

section h2 {
  color: #667eea;
  margin-bottom: 15px;
  font-size: 1.4rem;
  font-weight: 500;
}

section p {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
}

.image-placeholder-key {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 20px auto;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.image-placeholder {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 20px auto;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.image-placeholder-key.wide {
  width: 500px;
  height: 200px;
}

.image-placeholder.album {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  width: 500px;
  height: 200px;
}

.image-placeholder.album .placeholder-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 0.8rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  aspect-ratio: 1;
}

.image-placeholder.coupon {
  width: 400px;
  height: 150px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.image-placeholder.coupon::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
  transform: rotate(45deg);
}

.image-placeholder.grid {
  display: flex;
  gap: 10px;
  width: 400px;
  height: 100px;
}

.image-placeholder.grid .placeholder-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 0.8rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

section:nth-child(1) {
  border-left-color: #667eea;
}

section:nth-child(2) {
  border-left-color: #f093fb;
}

section:nth-child(3) {
  border-left-color: #4facfe;
}

section:nth-child(4) {
  border-left-color: #43e97b;
}

.particle {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
}

.flowing-comment {
  position: fixed;
  pointer-events: none;
  z-index: 1001;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  section {
    padding: 40px;
  }
}
</style>
