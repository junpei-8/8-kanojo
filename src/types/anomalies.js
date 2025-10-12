import AnomalyText from '../fragments/anomalies/AnomalyText.vue'
import AnomalyColor from '../fragments/anomalies/AnomalyColor.vue'
import AdBanner from '../fragments/anomalies/AdBanner.vue'
import AnomalyButtonDodge from '../fragments/anomalies/AnomalyButtonDodge.vue'
import AnomalyWindowSpam from '../fragments/anomalies/AnomalyWindowSpam.vue'

/**
 * 異変の設定オブジェクト。
 *
 * @typedef {Object} AnomalyConfig
 * @property {string} id - 異変の一意なID
 * @property {import('vue').Component} component - 異変を表示するVueコンポーネント
 */

/**
 * ゲーム内で使用可能な全異変のリスト。
 * ランダムに選択されて表示される。
 *
 * @type {AnomalyConfig[]}
 */
export const anomalies = [
  {
    id: 'text',
    component: AnomalyText
  },
  {
    id: 'color',
    component: AnomalyColor
  },
  {
    id: 'adBanner',
    component: AdBanner
  },
  {
    id: 'buttonDodge',
    component: AnomalyButtonDodge
  },
  {
    id: 'windowSpam',
    component: AnomalyWindowSpam
  },
  {
    id: 'otherKanojos'
  },
  {
    id: 'calling'
  }
]
