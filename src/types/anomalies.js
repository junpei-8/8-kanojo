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
  },
  {
    id: 'color',
  },
  {
    id: 'adBanner',
  },
  {
    id: 'buttonDodge',
  },
  {
    id: 'windowSpam',
  },
  {
    id: 'otherKanojos'
  },
  {
    id: 'calling'
  }
]
