<script setup>
import { computed, ref } from 'vue';
import GirlfriendEndingImage1 from '../../assets/ending-vegeta/ending-1.png';
import GirlfriendEndingImage2 from '../../assets/ending-vegeta/ending-2.png';

// const TEXTS = [
//   `――あれから30年後…`,
//   `世界は崩壊した。\nアメリカの民間組織「ストラト・フォー」による大規模なサイバーテロにより、\n国は解体され、都市は瓦礫と化し、わずかな人々が地下で息を潜めていた。`,
//   `ストラト・フォーを陰で操る男、アレクシス・レスキネン。\nあいつの行動は、まるで未来を知っているかのようだった。`,
//   `希望も、愛も、人間らしささえも失われた世界で、\n俺はただ一つの決意を胸に動いていた。`,

//   `――過去を変える。`,
//   `あの時の俺にとって、それは一歩前へ進むための決断だった。\n"彼女"との契約を解約し、もう振り返らないと決めた。`,
//   `けれど、それが間違いだったと気づくまで、時間はかからなかった。`,

//   `破滅の中でも、わずかに生き残った無線通信があった。\nそこから得た情報によれば、彼女はレスキネンの実の娘であり、\n今はストラト・フォーに抗う叛逆組織のリーダーとして人々を導いているという。`,
//   `そして俺も、自分では気づかなかった "未来を変える力" を持っていた。\nもし、あの時、俺と彼女が手を取り合っていたなら…`,
//   `きっと誰よりも早く、この腐りきった"未来"の兆候に気づき、違う道を選べたはずだ。`,

//   `出発の最中、ふと窓の外を見ると、ひとりの女性が立っていた。\n30年前、俺が"解約"という名の別れを告げた、あの彼女だった。`,
//   `彼女は何も言わず、ただ静かに空を見上げている。\nずっと見守ってくれていたのか。それとも、俺が再びこの時代へ戻ることを知っていたのか――。`,
//   `たかが数ヶ月の、金で繋がった関係。\nそう思っていた。\nけれど、きっとあれは――それだけじゃなかったんだ。`,
//   `深く息を吸い込み、指をスタートスイッチへと伸ばす。\nもう迷いはない。\nここからが、本当の「始まり」だ。`
// ]

const TEXTS = [
  `――あれから30年後…`,

  `世界は崩壊した。\nアメリカの民間組織「ストゼロ・ファー」による大規模なサイバーテロにより、\n国は解体され、都市は瓦礫と化し、わずかな人々が地下で息を潜めていた。`,
  `希望も、愛も、人間らしささえも失われた世界で、\n俺はただ一つの決意を胸に動いていた。`,

  `――過去を変える。`,
  `あの時の俺にとって、それは一歩前へ進むための決断だった。\n"彼女"との契約を解約し、もう振り返らないと決めた。`,

  `破滅の中でも、わずかに生き残った無線通信があった。\nそこから得た情報によれば、彼女は首謀者の娘であり、\n今はそれに抗う叛逆組織のリーダーとして人々を導いているという。`,
  `そして俺も、自分では気づかなかった "未来を変える力" を持っていた。\n`,
  `もし、あの時、俺と彼女が手を取り合っていたなら…`,
  `きっと誰よりも早く、この腐りきった"未来"の兆候に気づき、違う道を選べたはずだ。`,

  `出発の最中、ふと窓の外を見ると、ひとりの女性が立っていた。\n`,
  `30年前、俺が"解約"という名の別れを告げた、あの彼女だった。`,
  `ずっと見守ってくれていたのか。`,
  `たかが数ヶ月の、金で繋がった関係。\nそう思っていた。`,
  `けれど、きっとあれはそれだけじゃなかったんだ。`,
  `深く息を吸い込み、指をスタートスイッチへと伸ばす。`,
  `もう迷いはない。`,
  `今度は、このクソッタレな世界を解約する。`,
];

const currentIndex = ref(0);
const currentText = computed(() => TEXTS[currentIndex.value]);

const next = () => {
  currentIndex.value = currentIndex.value + 1;
};
</script>

<template>
  <div class="ending-overlay" @click="next">
    <img
      class="photo"
      :src="GirlfriendEndingImage1"
      alt=""
      :data-show="currentIndex >= 5"
    />
    <img
      class="photo"
      :src="GirlfriendEndingImage2"
      alt=""
      :data-show="currentIndex >= 10"
    />
    <div class="talk-box" v-if="currentText">
      {{ currentText }}
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
  z-index: 9999;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.8;
}

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
}
.photo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  opacity: 0;
}
.photo[data-show='true'] {
  opacity: 1;
  transition: opacity 1s ease-in;
}
</style>
