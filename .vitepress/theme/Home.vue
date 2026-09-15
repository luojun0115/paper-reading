<script setup lang="ts">
import PaperGrid from './PaperGrid.vue'
import { STATS } from './papers'
import { withBase } from 'vitepress'

const zones = [
  {
    icon: '📖', name: '单词区', en: 'VOCABULARY', href: withBase('/vocab/'),
    desc: '按章节分组的核心词汇，标注四级 / 六级 / 考研 / 考博 / 托福 / GRE。',
    badge: `${STATS.vocabPages} 份词表`, soon: false
  },
  {
    icon: '🎧', name: '听力区', en: 'LISTENING', href: withBase('/listen/'),
    desc: '自动逐词连播，先听后现，收藏与自测循环。',
    badge: `${STATS.listenPages} 条连播`, soon: false
  },
  {
    icon: '🎬', name: '朗读区', en: 'READING', href: withBase('/reading/'),
    desc: '逐页带读视频：原文高亮 + 逐词跟读 + 章节进度条。',
    badge: '筹备中', soon: true
  },
  {
    icon: '🎓', name: '讲解区', en: 'EXPLAIN', href: withBase('/explain/'),
    desc: '论文精读讲解，逐节拆解动机、方法与结论。',
    badge: '筹备中', soon: true
  }
]
</script>

<template>
  <div class="dr-home">
    <section class="dr-hero">
      <div class="dr-eyebrow">◆ {{ STATS.papers }} 篇深度学习经典论文 · {{ STATS.categories }} 个研究方向</div>
      <h1 class="dr-h1">一篇论文，<em>四种读法</em></h1>
      <p class="dr-lead">
        先<b>认词</b>，再<b>磨耳</b>，然后<b>跟着读</b>，最后<b>看懂它为什么重要</b>。
      </p>
      <div class="dr-stats">
        <div><b>{{ STATS.papers }}</b><span>论文</span></div>
        <div><b>{{ STATS.categories }}</b><span>研究方向</span></div>
        <div><b>{{ STATS.vocabPages + STATS.listenPages }}</b><span>学习页</span></div>
        <div><b>4</b><span>种读法</span></div>
      </div>
    </section>

    <section class="dr-sect">
      <h2 class="dr-sect-title">四个区</h2>
      <div class="dr-zones">
        <component
          :is="z.soon ? 'div' : 'a'"
          v-for="z in zones"
          :key="z.name"
          class="dr-zone"
          :class="{ soon: z.soon }"
          :href="z.soon ? undefined : z.href"
        >
          <span class="dr-zone-bar"></span>
          <span class="dr-zone-i">{{ z.icon }}</span>
          <div class="dr-zone-n">{{ z.name }}</div>
          <div class="dr-zone-e">{{ z.en }}</div>
          <div class="dr-zone-d">{{ z.desc }}</div>
          <span class="dr-zone-b" :class="{ soon: z.soon }">{{ z.badge }}</span>
        </component>
      </div>
    </section>

    <section class="dr-sect">
      <h2 class="dr-sect-title">论文库</h2>
      <PaperGrid mode="browse" />
    </section>
  </div>
</template>
