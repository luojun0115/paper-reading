#!/usr/bin/env node
/**
 * 由 _.vitepress/theme/theme-defs.mjs 生成主题 CSS 变量块。
 * 用法：node scripts/gen-theme-css.mjs
 * 生成物：.vitepress/theme/themes.generated.css（请勿手改）
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { THEMES } from '../.vitepress/theme/theme-defs.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const out = resolve(here, '../.vitepress/theme/themes.generated.css')

const VAR_MAP = [
  ['--dr-bg', 'bg'], ['--dr-bg2', 'bg2'], ['--dr-panel', 'panel'],
  ['--dr-ink', 'ink'], ['--dr-ink2', 'ink2'], ['--dr-line', 'line'],
  ['--dr-accent', 'accent'], ['--dr-asoft', 'asoft'], ['--dr-accent2', 'accent2'],
  ['--dr-on', 'on'], ['--dr-hf', 'hf'], ['--dr-hlet', 'hlet'],
  ['--dr-r', 'r'], ['--dr-bw', 'bw'], ['--dr-tex', 'tex'],
  ['--dr-tsize', 'tsize'], ['--dr-glow', 'glow'],
  ['--dr-hrule', 'hrule'], ['--dr-hrulem', 'hrulem']
]

const head = `/* 自动生成，请勿手改 —— 改 .vitepress/theme/theme-defs.mjs 后跑 node scripts/gen-theme-css.mjs */
/* 深读馆 DeepRead · ${THEMES.length} 套主题 · 生成于 ${new Date().toISOString().slice(0, 19).replace('T', ' ')} */
`

const blocks = THEMES.map(t => {
  const declares = VAR_MAP.map(([cssVar, jsKey]) => `  ${cssVar}: ${t.vars[jsKey]};`).join('\n')
  return `/* ${t.shortcut}. ${t.name} / ${t.en} (${t.dark ? '深色' : '浅色'}) */
html[data-theme='${t.key}'] {
  color-scheme: ${t.dark ? 'dark' : 'light'};
${declares}
}`
}).join('\n\n')

mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, `${head}\n${blocks}\n`, 'utf8')

// 自检：变量完整性
const bad = []
for (const t of THEMES) {
  for (const [, jsKey] of VAR_MAP) {
    if (t.vars[jsKey] === undefined) bad.push(`${t.key}.${jsKey}`)
  }
}
console.log(`✅ 生成 ${THEMES.length} 套主题 -> ${out}`)
console.log(`   每套变量数：${VAR_MAP.length}，缺失：${bad.length ? bad.join(', ') : '无'}`)
if (bad.length) process.exit(1)
