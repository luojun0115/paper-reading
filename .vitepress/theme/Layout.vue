<script setup lang="ts">
import { onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { initTheme } from './useTheme'

const { Layout } = DefaultTheme

// 首屏内联脚本已经设好 data-theme，这里只同步响应式状态
onMounted(initTheme)

// 静态学习页（/study/...）链接的整页跳转拦截已移至 theme/index.ts 模块顶层，
// 原因见彼处注释：需抢在 VitePress 路由器（window capture）之前注册。
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <ThemeSwitcher />
    </template>
  </Layout>
</template>
