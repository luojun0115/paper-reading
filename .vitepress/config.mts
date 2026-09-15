import { defineConfig } from 'vitepress'
import { THEMES, DEFAULT_THEME, STORAGE_KEY } from './theme/theme-defs.mjs'

const KEYS = THEMES.map((t: { key: string }) => t.key)

/**
 * 首屏防闪白：在 <head> 里、样式之前就把 data-theme 定下来。
 * 否则刷新时先渲染默认主题再跳到用户所选，会闪一下。
 */
const themeBootScript = `(function(){var k='${DEFAULT_THEME}';try{var s=localStorage.getItem('${STORAGE_KEY}');if(s&&${JSON.stringify(KEYS)}.indexOf(s)>-1)k=s}catch(e){}document.documentElement.setAttribute('data-theme',k)})()`

export default defineConfig({
  lang: 'zh-CN',
  title: '深读馆',
  titleTemplate: ':title · 深读馆 DeepRead',
  description: '一篇论文，四种读法 —— 单词 · 听力 · 朗读 · 讲解',
  cleanUrls: false,
  lastUpdated: false,
  appearance: false, // 关闭 VitePress 自带的明暗开关，改用自有主题切换器（数量见 theme-defs.mjs）
  ignoreDeadLinks: true,
  srcExclude: ['README.md', 'docs/**', 'design/**', 'scripts/**', 'data/**', 'agent.md', 'AGENTS.md', 'CLAUDE.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#b35400' }],
    ['script', {}, themeBootScript]
  ],

  markdown: {
    lineNumbers: false
  },

  themeConfig: {
    siteTitle: '深读馆',
    outline: false,
    docFooter: { prev: false, next: false },
    lastUpdatedText: '最后更新',

    nav: [
      { text: '首页', link: '/' },
      { text: '单词区', link: '/vocab/' },
      { text: '听力区', link: '/listen/' },
      { text: '朗读区', link: '/reading/' },
      { text: '讲解区', link: '/explain/' }
    ],

    footer: {
      message: '让科研像聊天一样简单。',
      copyright: '深读馆 DeepRead · Built with VitePress'
    }
  }
})
