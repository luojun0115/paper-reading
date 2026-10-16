---
title: 听力区
aside: false
pageClass: wide
editLink: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div class="dr-page-head">
  <div class="dr-ph-kicker">LISTENING</div>
  <h1>听力区</h1>
  <p>与单词区同一批词表的连播听力页：自动逐词朗读、先听后现、可收藏、可循环复习，音色可切换。适合通勤或睡前闭眼刷词——先靠耳朵认，再回头看拼写。点开即在原页播放。</p>
  <div class="dr-ph-actions">
    <a :href="withBase('/study/listen/index.html')" target="_self">连播索引 →</a>
    <a :href="withBase('/vocab/')">去单词区 📖</a>
  </div>
</div>

## 全部论文听力

<PaperGrid mode="listen" />
