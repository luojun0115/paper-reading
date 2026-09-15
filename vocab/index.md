---
title: 单词区
aside: false
pageClass: wide
editLink: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div class="dr-page-head">
  <div class="dr-ph-kicker">VOCABULARY</div>
  <h1>单词区</h1>
  <p>99 篇论文的核心词汇表，按论文章节分组，每个词标注 四级 / 六级 / 考研 / 考博 / 托福 / GRE 与音标、释义、原文语境。点开任意一篇即在原页学习，页内保留了音色选择、朗读、夜间模式等全部交互。</p>
  <div class="dr-ph-actions">
    <a :href="withBase('/study/vocab/index.html')" target="_self">按研究方向索引 →</a>
    <a :href="withBase('/study/vocab/index_按名称.html')" target="_self">按名称</a>
    <a :href="withBase('/study/vocab/index_按时间.html')" target="_self">按时间</a>
    <a :href="withBase('/study/vocab/index_按全称.html')" target="_self">按全称</a>
    <a :href="withBase('/listen/')">去听力区 🎧</a>
  </div>
</div>

## 全部论文词表

<PaperGrid mode="vocab" />
