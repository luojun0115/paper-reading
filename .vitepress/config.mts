import { defineConfig } from 'vitepress'
import { THEMES, DEFAULT_THEME, STORAGE_KEY } from './theme/theme-defs.mjs'

const KEYS = THEMES.map((t: { key: string }) => t.key)

// GitHub Pages 项目页子路径：改仓库名时必须同步改这里
const BASE = '/paper-reading/'

/**
 * 首屏防闪白：在 <head> 里、样式之前就把 data-theme 定下来。
 * 否则刷新时先渲染默认主题再跳到用户所选，会闪一下。
 */
const themeBootScript = `(function(){var k='${DEFAULT_THEME}';try{var s=localStorage.getItem('${STORAGE_KEY}');if(s&&${JSON.stringify(KEYS)}.indexOf(s)>-1)k=s}catch(e){}document.documentElement.setAttribute('data-theme',k)})()`

/**
 * 笔记区/讲解区里“单独一行的链接”渲染成卡片：
 *  - 视频平台（YouTube / B 站 / 直链 mp4） → 自适应播放器
 *  - 其它网站 → 链接预览卡片（标题 + 域名）
 * 用法：在 md 里把链接单独放一行即可；写 [标题](链接) 可自定义卡片标题。
 */
function toHost(href: string): string {
  if (/^https?:\/\//i.test(href)) {
    try { return new URL(href).hostname.replace(/^www\./, '') } catch { /* ignore */ }
  }
  return href
}

function videoEmbed(href: string): string | null {
  let m = href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/i)
  if (m) return `https://www.youtube.com/embed/${m[1]}?autoplay=0&rel=0`
  m = href.match(/bilibili\.com\/video\/(BV[\w]+)/i)
  if (m) return `https://player.bilibili.com/player.html?bvid=${m[1]}&autoplay=0`
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(href)) return href
  return null
}

function linkCardPlugin(md: any) {
  const esc = md.utils.escapeHtml
  md.core.ruler.after('inline', 'link_card', (state: any) => {
    const tokens = state.tokens
    let i = 0
    while (i < tokens.length) {
      const t = tokens[i]
      if (t.type === 'paragraph_open') {
        const inline = tokens[i + 1]
        const close = tokens[i + 2]
        if (inline && inline.type === 'inline' && close && close.type === 'paragraph_close') {
          const c = inline.children || []
          // 整段只有一个链接（裸链或 [文字](链接)），无其他文字
          if (c.length === 3 && c[0].type === 'link_open' && c[1].type === 'text' && c[2].type === 'link_close') {
            const href = c[0].attrGet('href') || ''
            const text = c[1].content || ''
            const host = toHost(href)
            const embed = videoEmbed(href)
            let html: string
            if (embed) {
              html = `<figure class="note-embed">\n`
                + `<iframe src="${esc(embed)}" allow="fullscreen; picture-in-picture" allowfullscreen scrolling="no" frameborder="0"></iframe>\n`
                + `<figcaption><a href="${esc(href)}" target="_blank" rel="noopener">${esc(text || host)} ↗</a></figcaption>\n`
                + `</figure>\n`
            } else {
              html = `<a class="link-card" href="${esc(href)}" target="_blank" rel="noopener">\n`
                + `  <span class="lc-icon">🔗</span>\n`
                + `  <span class="lc-body">\n`
                + `    <span class="lc-title">${esc(text || host)}</span>\n`
                + `    <span class="lc-url">${esc(host)}</span>\n`
                + `  </span>\n`
                + `  <span class="lc-arrow">↗</span>\n`
                + `</a>\n`
            }
            const tok = new state.Token('html_block', '', 0)
            tok.content = html
            tokens.splice(i, 3, tok)
            i += 1
            continue
          }
        }
      }
      i += 1
    }
  })
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'Deep Reading',
  titleTemplate: ':title · Deep Reading',
  description: '一篇论文，四种读法 —— 单词 · 听力 · 朗读 · 讲解',
  base: BASE,
  cleanUrls: false,
  lastUpdated: false,
  appearance: false, // 关闭 VitePress 自带的明暗开关，改用自有主题切换器（数量见 theme-defs.mjs）
  ignoreDeadLinks: true,
  srcExclude: ['README.md', 'docs/**', 'design/**', 'scripts/**', 'data/**', 'agent.md', 'AGENTS.md', 'CLAUDE.md', 'public/**'],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#b35400' }],
    ['script', {}, themeBootScript]
  ],

  markdown: {
    lineNumbers: false,
    config(md) {
      md.use(linkCardPlugin)
    }
  },

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Deep Reading',
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

    // 不显示左侧侧边栏（各栏目通过顶部导航访问）
    sidebar: false,

    footer: {
      message: '让科研像聊天一样简单。',
      copyright: 'Deep Reading · Built with VitePress'
    }
  }
})
