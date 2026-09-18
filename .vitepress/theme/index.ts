import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import Layout from './Layout.vue'
import Home from './Home.vue'
import PaperGrid from './PaperGrid.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

import './themes.generated.css'
import './custom.css'

/**
 * 拦截指向 public/ 下静态学习页（/study/...）的内部链接，强制整页跳转。
 * 这些页面是独立静态 HTML，不在 VitePress 的 SPA 路由表里；走 SPA 跳转会渲染 404。
 *
 * 为什么注册在【模块顶层 + window + capture】：
 * VitePress 路由器的 click 监听在 window 上且 capture:true（router.js L120/169），
 * 并检查 defaultPrevented（L121）。事件传播 window捕获 → document捕获 → target，
 * 若在组件 onMounted(document, capture) 里注册，永远排在路由器之后，
 * 路由器已先 preventDefault+go() 渲染出 404，再整页跳转会「先闪404再正常」。
 * 而本模块在 createApp()（路由器创建）之前被导入执行，同节点同阶段按注册顺序，
 * 这里注册在先 → 先执行 → preventDefault 后路由器自检 defaultPrevented 直接退出，
 * 全程只有一次整页跳转，无 404 闪现。SSR 下无 window，需守卫。
 */
if (typeof window !== 'undefined') {
  window.addEventListener(
    'click',
    (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      const el = e.target as HTMLElement | null
      const a = el?.closest?.('a') as HTMLAnchorElement | null
      if (!a) return
      if (a.target === '_blank' || a.hasAttribute('download')) return
      const href = a.getAttribute('href') || ''
      const isStudy = href.startsWith('/study/') || href.startsWith('/paper-reading/study/')
      if (!isStudy) return
      e.preventDefault()
      e.stopPropagation()
      window.location.href = href.startsWith('/paper-reading/') ? href : '/paper-reading' + href
    },
    { capture: true }
  )
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Home', Home)
    app.component('PaperGrid', PaperGrid)
    app.component('ThemeSwitcher', ThemeSwitcher)
  }
} satisfies Theme
