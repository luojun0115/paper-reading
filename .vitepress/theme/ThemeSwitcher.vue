<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from './useTheme'

const { current, themes, setTheme } = useTheme()
const open = ref(false)
const box = ref<HTMLElement | null>(null)

/**
 * 面板上的「几套」和快捷键提示都从数据算，不写死 ——
 * 加/减主题时只需改 theme-defs.mjs，这里自动跟上。
 */
const keyHint = computed(() => {
  const ks = themes.map(t => t.shortcut)
  const uniq = new Set(ks)
  const isDigitRun =
    uniq.size === ks.length &&
    ks.every(k => /^[0-9]$/.test(k))
  return isDigitRun
    ? `${[...uniq].sort()[0]}–${[...uniq].sort().pop()}`
    : ks.join(' / ')
})

function pick(key: string) {
  setTheme(key)
  open.value = false
}

function onDocClick(e: MouseEvent) {
  if (open.value && box.value && !box.value.contains(e.target as Node)) open.value = false
}

function onKey(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null
  const tag = el?.tagName?.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || el?.isContentEditable) return
  if (e.metaKey || e.ctrlKey || e.altKey) return
  const hit = themes.find(t => t.shortcut === e.key)
  if (hit) { setTheme(hit.key); open.value = false }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="box" class="dr-switch">
    <button
      class="dr-switch-btn"
      :class="{ on: open }"
      :title="`切换主题风格（数字键 ${keyHint} 快捷键）`"
      aria-label="切换主题风格"
      :aria-expanded="open"
      @click.stop="open = !open"
    >
      <span class="dr-switch-dot" aria-hidden="true"></span>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
      </svg>
    </button>

    <div v-show="open" class="dr-switch-panel" role="menu">
      <div class="dr-sp-head">主题风格 · {{ themes.length }} 套</div>
      <button
        v-for="t in themes"
        :key="t.key"
        class="dr-sp-item"
        :class="{ on: current === t.key }"
        role="menuitemradio"
        :aria-checked="current === t.key"
        @click="pick(t.key)"
      >
        <span class="dr-sp-dots">
          <i v-for="c in t.chips.slice(1, 4)" :key="c" :style="{ background: c }"></i>
        </span>
        <span class="dr-sp-name">{{ t.name }}</span>
        <span class="dr-sp-en">{{ t.en }}</span>
        <span class="dr-sp-k">{{ t.shortcut }}</span>
      </button>
      <div class="dr-sp-foot">按 {{ keyHint }} 秒切 · 选择会被记住</div>
    </div>
  </div>
</template>
