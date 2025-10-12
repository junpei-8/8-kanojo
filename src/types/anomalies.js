import AnomalyText from '../components/AnomalyText.vue'
import AnomalyColor from '../components/AnomalyColor.vue'

/**
 * @typedef {Object} AnomalyConfig
 * @property {string} id
 * @property {import('vue').Component} component
 */

/** @type {AnomalyConfig[]} */
export const anomalies = [
  {
    id: 'text',
    component: AnomalyText
  },
  {
    id: 'color',
    component: AnomalyColor
  }
  // 追加の異変はここに追加
  // {
  //   id: 'image',
  //   component: AnomalyImage
  // },
]
