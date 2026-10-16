// 主题数据的 TS 包装层。真正的数据在 theme-defs.mjs（Node 与 Vite 共用）。
// @ts-ignore - 纯 ESM 数据文件，无类型声明
import { THEMES as RAW, DEFAULT_THEME, STORAGE_KEY } from './theme-defs.mjs'

export interface ThemeVars {
  bg: string; bg2: string; panel: string; ink: string; ink2: string; line: string
  accent: string; asoft: string; accent2: string; on: string
  hf: string; hlet: string; r: string; bw: string
  tex: string; tsize: string; glow: string
  /** 标题下方编辑装饰线：高度（0px = 不显示）/ 上边距 */
  hrule: string; hrulem: string
}

export interface Theme {
  key: string
  name: string
  en: string
  dark: boolean
  shortcut: string
  chips: string[]
  vars: ThemeVars
}

export const THEMES = RAW as Theme[]
export { DEFAULT_THEME, STORAGE_KEY }

export const THEME_KEYS: string[] = THEMES.map(t => t.key)

export function getTheme(key: string): Theme {
  return THEMES.find(t => t.key === key) ?? THEMES[0]
}

export function isDarkTheme(key: string): boolean {
  return getTheme(key).dark
}
