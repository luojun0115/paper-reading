#!/usr/bin/env node
/**
 * 把「生成物临时区 temp/」的静态学习页同步进站点的 public/study/（VitePress 只发布 public/ 下的静态文件）。
 *
 *   temp/vocab/*         →  public/study/vocab/*
 *   temp/listen/*        →  public/study/listen/*
 *   temp/vocab-words/*   →  public/study/vocab-words/*
 *   temp/listen-audio/*  →  public/study/listen-audio/*
 *
 * 新流程：生成脚本先产出到 temp/（git 忽略），确认无误后跑本脚本搬进 public/study/，再构建部署。
 * 源目录不存在则跳过，不报错。
 *
 * 顺带修掉跨目录相对链接。
 * 用法：node scripts/sync-study-pages.mjs
 */
import { cp, rm, readFile, writeFile, readdir, stat, access } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, resolve, relative, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(here, '..')          // paper-reading/
const SRC = join(ROOT, 'temp')            // 生成物临时区（git 忽略）
const DST = join(ROOT, 'public', 'study')

const PAIRS = [
  { from: 'vocab', to: 'vocab' },
  { from: 'listen', to: 'listen' },
  { from: 'vocab-words', to: 'vocab-words' },
  { from: 'listen-audio', to: 'listen-audio' }
]

const SKIP = new Set(['.DS_Store'])
// .md 必须排除：VitePress 会扫描全站的 .md 当路由，public/ 里的也会被 Rollup 解析而报错。
// 这个目录下唯一一份 .md 是上游 README 的副本，站点不需要。
const SKIP_EXT = ['.md']

async function walk(dir) {
  const out = []
  for (const name of await readdir(dir)) {
    if (SKIP.has(name)) continue
    const p = join(dir, name)
    const s = await stat(p)
    if (s.isDirectory()) out.push(...await walk(p))
    else out.push(p)
  }
  return out
}

// 1) 复制
let copied = 0
for (const { from, to } of PAIRS) {
  const src = join(SRC, from)
  const dst = join(DST, to)
  if (!existsSync(src)) { console.log(`  ${from} 无（跳过）`); continue }
  await rm(dst, { recursive: true, force: true })
  await cp(src, dst, {
    recursive: true,
    filter: (s) => {
      const name = s.split('/').pop()
      return !SKIP.has(name) && !SKIP_EXT.some(e => name.endsWith(e))
    }
  })
  copied = (await walk(dst)).length
  console.log(`  ${from}  ->  public/study/${to}   (${copied} 个文件)`)
}

// 2) 修跨目录链接
let patched = 0
const VOCAB_INDEXES = ['index.html', 'index_按名称.html', 'index_按时间.html', 'index_按全称.html']

for (const f of VOCAB_INDEXES) {
  const p = join(DST, 'vocab', f)
  if (!existsSync(p)) continue
  const s = await readFile(p, 'utf8')
  if (s.includes('../vocab-listen/index.html')) {
    await writeFile(p, s.replaceAll('../vocab-listen/index.html', '../listen/index.html'), 'utf8')
    patched++
  }
}

const listenIdx = join(DST, 'listen', 'index.html')
if (existsSync(listenIdx)) {
  const s = await readFile(listenIdx, 'utf8')
  const out = s.replaceAll('"../index', '"../vocab/index')
  if (out !== s) { await writeFile(listenIdx, out, 'utf8'); patched++ }
}
console.log(`  修补跨目录链接：${patched} 个文件`)

// 3) 全量校验相对链接
const files = await walk(DST)
const htmlFiles = files.filter(f => f.endsWith('.html'))
let checked = 0
const broken = []
for (const f of htmlFiles) {
  const text = await readFile(f, 'utf8')
  const base = dirname(f)
  for (const m of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = m[1].replaceAll('&amp;', '&')
    if (/^(?:https?:|data:|mailto:|javascript:|#|\/\/)/.test(raw) || !raw) continue
    checked++
    const target = normalize(join(base, decodeURIComponent(raw.split('#')[0].split('?')[0])))
    if (!existsSync(target)) broken.push(`${relative(DST, f)} -> ${raw}`)
  }
}

console.log(`\n  HTML 页面：${htmlFiles.length} 个`)
console.log(`  相对链接：检查 ${checked} 条，失效 ${broken.length} 条`)
if (broken.length) {
  broken.slice(0, 20).forEach(b => console.log(`    ✗ ${b}`))
  process.exit(1)
}
console.log('  ✅ 全部相对链接可达')
