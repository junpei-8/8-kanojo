/**
 * 異変の設定オブジェクト。
 *
 * @property {string} id - 異変の一意なID
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
    id: 'otherKanojos',
  },
  {
    id: 'calling',
  },
  {
    id: 'broken',
  },
  {
    id: 'mojibake',
  },
  {
    id: 'comment',
  },
];
