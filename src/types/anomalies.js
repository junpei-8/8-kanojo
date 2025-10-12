import AnomalyText from '../fragments/anomalies/AnomalyText.vue'
import AnomalyColor from '../fragments/anomalies/AnomalyColor.vue'

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
