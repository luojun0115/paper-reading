import { ref } from 'vue'
import { THEMES, THEME_KEYS, DEFAULT_THEME, STORAGE_KEY, getTheme } from './themes'

/** 全局当前主题（单例，跨组件共享） */
const current = ref<string>(DEFAULT_THEME)

export function applyTheme(key: string, persist = true) {
  const k = THEME_KEYS.includes(key) ? key : DEFAULT_THEME
  current.value = k
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = k
    // 让浏览器原生控件（滚动条、表单）也跟着深浅走
    document.documentElement.style.colorScheme = getTheme(k).dark ? 'dark' : 'light'
  }
  if (persist) {
    try { localStorage.setItem(STORAGE_KEY, k) } catch { /* 隐私模式忽略 */ }
  }
}

/**
 * 首屏同步：<head> 里的内联脚本已按 localStorage 设好 data-theme（防闪白），
 * 这里只把它同步进 Vue 的响应式状态，让切换面板的高亮正确。
 */
export function initTheme() {
  if (typeof window === 'undefined') return
  let k = document.documentElement.dataset.theme || DEFAULT_THEME
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && THEME_KEYS.includes(saved)) k = saved
  } catch { /* ignore */ }
  applyTheme(k, false)
}

export function useTheme() {
  return { current, themes: THEMES, setTheme: applyTheme, isDark: (k: string) => getTheme(k).dark }
}
