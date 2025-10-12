<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// x秒ごとにy文字の文字数を文字化けさせる。(上限10回)
let textCorruptionIntervalId = null;

function startTextCorruption(intervalSec = 3, countPer = 3) {
  // 全てのロジックを同一スコープ内に配置
  let interval = 1000 * intervalSec;
  const corruptChars = [
    '�',
    '□',
    '▢',
    '▣',
    '▤',
    '▥',
    '▦',
    '▧',
    '▨',
    '▩',
    '◼',
    '◻',
    '▪',
    '▫',
    '■',
    '□',
    '▬',
    '▭',
    '▮',
    '▯',
    '◆',
    '◇',
    '◈',
    '◉',
    '◊',
    '○',
    '●',
    '◐',
    '◑',
    '◒',
    '◓',
    '◔',
    '◕',
  ];
  let executionCount = 0;
  const maxExecutions = 10;
  const originalTexts = new Map(); // 元のテキストを保存

  // DOMツリーからテキストノードを収集する関数
  function getTextNodes(node, textNodes = []) {
    if (node.nodeType === Node.TEXT_NODE) {
      // 空白や改行のみのノードは除外
      if (node.textContent.trim().length > 0) {
        textNodes.push(node);
      }
    } else {
      // scriptタグとstyleタグは除外
      if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
        for (let child of node.childNodes) {
          getTextNodes(child, textNodes);
        }
      }
    }
    return textNodes;
  }

  // ランダムな文字化け文字を取得
  function getRandomCorruptChar() {
    return corruptChars[Math.floor(Math.random() * corruptChars.length)];
  }

  // テキストをランダムに文字化けさせる関数
  function corruptText() {
    if (executionCount >= maxExecutions) {
      clearInterval(intervalId);
      return;
    }

    // 現在のページのテキストノードを取得
    const textNodes = getTextNodes(document.body);

    if (textNodes.length === 0) {
      return;
    }

    // 文字化けさせる文字数分ループ
    for (let i = 0; i < countPer; i++) {
      // ランダムにテキストノードを選択
      const randomNode =
        textNodes[Math.floor(Math.random() * textNodes.length)];
      const text = randomNode.textContent;

      if (text.length === 0) continue;

      // 元のテキストを保存（初回のみ）
      if (!originalTexts.has(randomNode)) {
        originalTexts.set(randomNode, text);
      }

      // ランダムな位置の文字を文字化け文字に置き換え
      const randomIndex = Math.floor(Math.random() * text.length);
      const newText =
        text.substring(0, randomIndex) +
        getRandomCorruptChar() +
        text.substring(randomIndex + 1);

      randomNode.textContent = newText;
    }

    executionCount++;
  }

  // インターバルで実行
  const intervalId = setInterval(corruptText, interval);

  // 初回実行は即座に行わない（intervalミリ秒後に開始）
  return intervalId;
}

// コンポーネントがマウントされた後に文字化け機能を開始
onMounted(() => {
  textCorruptionIntervalId = startTextCorruption(1.5, 5); // 1秒ごとに5文字ずつ文字化け
});

// コンポーネントがアンマウントされる際にインターバルをクリア
onUnmounted(() => {
  if (textCorruptionIntervalId) {
    clearInterval(textCorruptionIntervalId);
  }
});
</script>
