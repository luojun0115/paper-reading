<script setup lang="ts">
import { computed, ref } from 'vue'
import { GROUPS, PAPERS, vocabUrl, listenUrl, type Paper } from './papers'

const props = withDefaults(defineProps<{
  /** browse = 首页总览；vocab / listen = 各区的学习入口 */
  mode?: 'browse' | 'vocab' | 'listen'
  searchable?: boolean
}>(), { mode: 'browse', searchable: true })

const cat = ref<string>('全部')
const q = ref<string>('')

const catList = computed(() => [
  { name: '全部', count: PAPERS.length },
  ...GROUPS.map(g => ({ name: g.category, count: g.papers.length }))
])

const list = computed<Paper[]>(() => {
  const kw = q.value.trim().toLowerCase()
  return PAPERS.filter(p => {
    if (cat.value !== '全部' && p.category !== cat.value) return false
    if (!kw) return true
    return (p.name + ' ' + p.year + ' ' + p.title + ' ' + p.category).toLowerCase().includes(kw)
  })
})

const primary = (p: Paper) => (props.mode === 'listen' ? listenUrl(p.slug) : vocabUrl(p.slug))
const shortCat = (c: string) => c.split(/[\s/]+/)[0]
</script>

<!--
  为什么每个指向 /study/**.html 的链接都带 target="_self"：
  VitePress 会拦截同源、且扩展名不在它白名单内的链接，交给 SPA 路由处理。
  它的白名单里有 xhtml 却没有 html，所以 .html 链接会被当成站内路由，
  结果渲染出站点外壳包着的 404 页。带 target 属性会命中它的早退分支，
  退化成浏览器的真实整页跳转 —— 静态学习页才能正常打开。
  （改动前务必先读 node_modules/vitepress/dist/client/app/router.js 的 click 处理）
-->
<template>
  <div class="dr-lib">
    <div class="dr-lib-bar">
      <div class="dr-chips">
        <button
          v-for="c in catList"
          :key="c.name"
          class="dr-chip"
          :class="{ on: cat === c.name }"
          @click="cat = c.name"
        >{{ c.name }}<span>{{ c.count }}</span></button>
      </div>
      <label v-if="searchable" class="dr-search">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input v-model="q" type="search" placeholder="搜论文名 / 英文标题 / 年份…" aria-label="搜索论文" />
      </label>
    </div>

    <div class="dr-count">
      共 <b>{{ list.length }}</b> 篇
      <span v-if="cat !== '全部'"> · {{ cat }}</span>
      <span v-if="q"> · 匹配「{{ q }}」</span>
    </div>

    <div class="dr-grid">
      <article v-for="p in list" :key="p.slug" class="dr-card">
        <div class="dr-card-r1">
          <a class="dr-card-nm" :href="primary(p)" target="_self">{{ p.name }}</a>
          <span class="dr-card-yr">{{ p.year }}</span>
          <span class="dr-card-cat">{{ shortCat(p.category) }}</span>
        </div>
        <div class="dr-card-ttl">{{ p.title }}</div>
        <div class="dr-card-bd">
          <a class="dr-pill" :class="{ pri: mode === 'vocab' }" :href="vocabUrl(p.slug)" target="_self">📖 词表</a>
          <a v-if="p.listen" class="dr-pill" :class="{ pri: mode === 'listen' }" :href="listenUrl(p.slug)" target="_self">🎧 听力</a>
          <span v-else class="dr-pill off">🎧 听力</span>
          <span class="dr-pill off" title="内容筹备中">🎬 朗读</span>
          <span class="dr-pill off" title="内容筹备中">🎓 讲解</span>
        </div>
      </article>
    </div>

    <p v-if="!list.length" class="dr-empty">没有匹配的论文，换个关键词试试。</p>
  </div>
</template>
