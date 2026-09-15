<script setup lang="ts">
import { onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { initTheme } from './useTheme'

const { Layout } = DefaultTheme

// 首屏内联脚本已经设好 data-theme，这里只同步响应式状态
onMounted(initTheme)
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <ThemeSwitcher />
    </template>
  </Layout>
</template>
