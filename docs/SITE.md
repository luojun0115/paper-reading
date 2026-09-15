# 深读馆 DeepRead · 站点说明

VitePress 站点，挂在 `paper-reading/` 下。四个区：单词区 / 听力区 / 朗读区 / 讲解区。

```bash
cd paper-reading
npm install
npm run dev        # 开发
npm run build      # 构建到 .vitepress/dist
npm run preview    # 预览构建产物
```

## 目录结构

```
paper-reading/
├── .vitepress/
│   ├── config.mts                 站点配置（导航、首屏主题脚本、srcExclude）
│   └── theme/
│       ├── theme-defs.mjs         ← 10 套主题的唯一真源（改这里）
│       ├── themes.generated.css   ← 由脚本生成，勿手改
│       ├── themes.ts              主题数据的 TS 包装
│       ├── useTheme.ts            主题状态 + localStorage 持久化
│       ├── ThemeSwitcher.vue      右上角切换面板（数字键 0–9）
│       ├── Home.vue               首页（Hero + 四区 + 论文库）
│       ├── PaperGrid.vue          论文栅格（分类筛选 + 搜索）
│       ├── papers.ts              论文清单读取 + URL 拼装
│       ├── custom.css             主题变量 → VitePress 变量映射 + 组件样式
│       ├── Layout.vue             把切换器挂进顶栏
│       └── index.ts               主题入口
├── data/papers.json               99 篇论文清单（10 个分组）
├── public/
│   ├── favicon.svg
│   └── study/                     ← 由脚本同步，勿手改（已 gitignore）
│       ├── vocab/                 103 个词表页（原 vocab-html）
│       └── listen/                100 个听力页（原 vocab-listen）
├── index.md  vocab/  listen/  reading/  explain/
└── scripts/
    ├── gen-theme-css.mjs          theme-defs.mjs → themes.generated.css
    └── sync-study-pages.mjs       上游静态学习页 → public/study/
```

## 日常维护

**改主题**：只改 `.vitepress/theme/theme-defs.mjs`，然后

```bash
node scripts/gen-theme-css.mjs
```

脚本会重写 `themes.generated.css` 并校验每套主题的 19 个变量是否齐全，缺了就退出码 1。
新增主题记得同时给它一个 `shortcut`（当前已占满 `1`–`9` 和 `0`，再加要换字母）。
面板上的「几套」「快捷键 0–9」等文案由 `ThemeSwitcher.vue` 从数据算出，不用手改。

变量里有两个是为**版式差异**服务的，多数主题保持默认即可：

| 变量 | 作用 | 默认 |
|---|---|---|
| `hrule` / `hrulem` | 首页主标题下方的编辑装饰线：线高 / 其上边距 | `0px` / `0px`（不显示、不占高） |

杂志内页（`magazine`）把它们设为 `4px` / `20px`，标题下就多出一条洋红短横线 —— 这是目前唯一一处「主题改变的不只是颜色」。要加类似装饰，照这个模式**加变量**，不要在 `custom.css` 里写 `html[data-theme='xxx']` 特例，否则主题就不在唯一真源里了。

**同步学习页**：上游的 `../vocab-html`、`../vocab-listen` 有更新时

```bash
node scripts/sync-study-pages.mjs
```

它会复制、修跨目录链接、并校验全部相对链接可达（当前 520 条）。脚本会输出页数与失效数，失效会以退出码 1 结束。

## 几个已踩过的坑（改之前先看）

### 1. 指向 `/study/**.html` 的链接必须带 `target`

VitePress 会拦截同源链接，条件是「扩展名不在它的白名单里」就交给 SPA 路由。它的白名单里有 `xhtml` 却没有 `html`，所以 `.html` 链接会被当成站内路由，最后渲染出**站点外壳包着的 404 页**（URL 正确、内容是 404，很容易被误判成"跳转成功了"）。

链接上带任意 `target` 属性会命中它的早退分支，退化成浏览器真实整页跳转。所以 `PaperGrid.vue` 和两个区页里的链接全是 `target="_self"`。判断依据在 `node_modules/vitepress/dist/client/app/router.js` 的 `window.addEventListener('click')`。

### 2. 自定义样式的权重打不过 VitePress

VitePress 对正文元素用的是 `.vp-doc h1`、`.vp-doc h2`、`.vp-doc p` 这类选择器，权重 `(0,1,1)`；单个类名如 `.dr-h1` 是 `(0,1,0)`，会被压住 —— 表现是主标题莫名其妙变成 32px、章节标题顶上多出 48px。

所以正文区域内的样式都写成了 `.dr-home .dr-h1`、`.vp-doc .dr-soon h3` 这种两段式。加新样式时照这个来。

**这条最阴的一个变体是 `.vp-doc a`**：

```css
.vp-doc a { font-weight: 500; color: var(--vp-c-brand-1); text-decoration: underline; }
```

权重 `(0,1,1)`，会一次性盖掉自有链接类的 `font-weight` / `color` / `text-decoration`。症状是**区卡片标题和论文名被染成主题主色、字重掉到 500、还多出一条下划线** —— 而且它不改变布局，只是"颜色和粗细不对"，看图很容易当成设计如此，靠肉眼根本发现不了。

所以 `.dr-home .dr-zone`、`.dr-lib .dr-card-nm`、`.dr-lib .dr-pill` 都带父级前缀。排查时用 CDP 的 `CSS.getMatchedStylesForNode` 列出真正命中的规则，比猜快得多；`check.mjs` 里有对应回归断言（「自有链接类未被 .vp-doc a 覆盖」）。

注：说明文页面里 markdown 正文的链接**应当**保持 VitePress 默认样式，所以这层前缀只加在自有组件类上，别图省事写成 `.vp-doc a { ... !important }`。

### 3. 首页四区卡片要保持紧凑（≤165px）

四区是导航，不是内容主体，卡片高度被刻意压到 **154px**。两个易被无意破坏的点：

1. **别给 `.dr-zone` 加 `min-height`**。原来 `.dr-zone-d` 有一条 `min-height: 56px`，本意是让四张卡等高，实际是把每张卡强行撑到 3 行文字的高度（字号才 11.5px）。等高交给 grid 的默认 `stretch` 就行。
2. **行高显式写出来**。卡片里三行文字的字号是 16/15/10px，但继承的行高是 24px，光这一项就多占 30px 以上。现在 `.dr-zone-n` 用 `1.3`、`.dr-zone-e` 用 `1.4`、`.dr-zone-d` 用 `1.55`。

卡片是 `display:flex; flex-direction:column`，药丸用 `margin-top:auto` 贴底 —— 描述 1 行和 2 行的卡片高度一致、药丸底边对齐。要调整尺寸时跑 `analysis/site-check/check.mjs`，其中「四区卡片保持紧凑」这条会拦下超标改动。

### 4. 页面容器宽度要 `pageClass: wide`

首页与两个区页在 frontmatter 里标了 `pageClass: wide`，`custom.css` 里对 `.wide` 放开 1240px 栅格。VitePress 自带的宽度规则带 `[data-v-xxxx]` 作用域属性（权重 `(0,4,0)`），且 hash 会随版本变，所以那几条用了 `!important`，同时限制在 `.wide` 内，说明文页面的行宽不受影响。

### 5. `vitepress preview` 必须在 `build` **之后**启动

预览服务启动时会缓存 dist 的文件清单。先起服务再构建，新产物（CSS/JS 的 hash 变了）会全部 404，页面回落到 404 页且控制台一堆 `ERR_ABORTED`。改完代码的顺序是：`build` → 停旧服务 → 起新服务。

### 6. `.vitepress/theme/*.data.mjs` 这个文件名不能用

VitePress 有「构建期数据加载」约定，`.data.js|ts` 会被当成数据加载器并要求默认导出函数，直接报 `config must export or return an object`。主题数据文件因此叫 `theme-defs.mjs`。

### 7. `public/` 里不能放 `.md`

VitePress 扫描全站 `.md` 当路由，`public/` 里的也会被 Rollup 解析，报 `Rollup failed to resolve import`。`sync-study-pages.mjs` 已过滤 `.md`。

## 四个区的内容来源

| 区 | 数据来源 | 状态 |
|---|---|---|
| 单词区 | `/study/vocab/<slug>_论文词汇.html` | 99 篇已上线 |
| 听力区 | `/study/listen/<slug>_听力.html` | 99 篇已上线 |
| 朗读区 | — | 占位页，`reading/index.md` |
| 讲解区 | — | 占位页，`explain/index.md` |

论文编号与 URL 规则都在 `.vitepress/theme/papers.ts` 里：
`vocabUrl(slug)` / `listenUrl(slug)`。补朗读区、讲解区时，在 `PaperGrid.vue` 的卡片里把对应的 `dr-pill.off` 换成 `<a target="_self">` 即可，其余不用动。
