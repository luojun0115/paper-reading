# agent.md — 深读馆 DeepRead 协作规则

> 项目级 AI 协作规约。Claude / Codebuddy / Cursor / Cline / Trae / Qoder / OpenCode
> 等打开本仓库都必须遵守。用户后续新增规则直接追加到本文件即可生效。
> 本文件放在仓库根目录；`AGENTS.md` 与 `CLAUDE.md` 是其软链接，覆盖更多工具。

## 一、仓库身份
- 深读馆 DeepRead（paper-reading，npm name: deepread），VitePress 论文带读站。
- 构建：`npm run build` → `.vitepress/dist/`。
- 站点只发布 `public/` 下静态文件；论文/paper notes（PDF 原文）在外层 `papers/paper-lm/` 目录，不进本仓库。
- 数据由生成工具产出到外层 `papers/vocab-html`、`papers/vocab-listen`（sync 脚本原读取位置）。
- 笔记源（page-notes，99 篇 md）在外层 `papers/paper-notes/`，**不进本仓库**；构建部署时从该目录拷入（见第三节 C、第十三节）。
- **站点子路径**：因托管在 GitHub Pages 项目页，`.vitepress/config.mts` 已设 `base: '/paper-reading/'`；改仓库名时同步改 base。

## 二、分支模型（必须遵守）
| 分支 | 职责 | 内容 |
|---|---|---|
| main | 受保护基线 | 永不提交/合并/推送（远程 main 仅含 imgs + README） |
| work | 原始内容分支 | `imgs/`、`agent.md` 等；**笔记源已移出仓库**（在外层 `papers/paper-notes/`，构建时拷入，见第十三节） |
| code | 代码/构建页分支 | VitePress 项目源码 + 生成页 `public/study/**`（词汇页/听力页/词表/听力音频）+ `data/` + `scripts/` |
| build | 渲染产物分支 | **只放渲染产物** `.vitepress/dist/`（外加必需的工作流 `.github/` 与 `.gitignore`）；**源码一律不入库** |

### 禁止
- 禁止 push main（本地 pre-push 钩子拒绝；远程 main 也设了分支保护，见第八节）。
- 跨分支取内容用 `git checkout <分支> -- <路径>` 取快照；禁止 `git merge work` / `git merge code`（避免草稿历史污染）。
- ⚠️ **build 分支禁止提交源码**；构建后只 `git add -f .vitepress/dist .github .gitignore`，源码用 `git rm -r --cached --ignore-unmatch .` 取消跟踪。

## 三、日常流程

### A. 笔记（paper-notes）——在外层 `papers/paper-notes/`，不进仓库
```bash
#   直接编辑外层目录（不纳入 git）：
#   /Users/milong/Desktop/code/zcode-test/papers/paper-notes/XX.md
#   对外 URL 仍是 /paper-notes/XX.html（构建时拷入 + code 的 rewrites 映射，见第三节 C、第十三节）
```

### B. 词汇页 / 听力页 / 音频——归 code
生成工具产出在仓库外 `../vocab-html`、`../vocab-listen`、`../vocab-words`，拷进 code 的 `public/study/**` 后提交。
```bash
git switch code
rm -rf public/study/vocab public/study/listen public/study/vocab-words   # 先清残留，避免死页
cp -r ../vocab-html/* public/study/vocab/
cp -r ../vocab-listen/* public/study/listen/
cp -r ../vocab-words/* public/study/vocab-words/
#   如需要，编辑 data/papers.json 加条目（slug 与文件名一致，listen:true）
git add public/study data/papers.json && git commit -m "site: 论文XX 入站"
```

### C. 构建部署——build 分支只提交渲染产物
```bash
git switch build
git reset --hard origin/build        # 起点（build 分支只有 dist）
git checkout code -- .               # 源码 + public/study 生成页/音频
mkdir -p papers/paper-notes && cp -R ../paper-notes/. papers/paper-notes/   # 从外层 papers/paper-notes 拷入笔记源
rm -rf paper-notes                   # ⚠️ 清掉 reset 残留的旧根目录 paper-notes/，否则与 rewrites 目标冲突 → 渲染崩溃（见第十三节）
CODEBUDDY_SAFE_DELETE_ENABLED=0 NODE_OPTIONS= npm run build
# 校验：ls .vitepress/dist/paper-notes/*.html | wc -l ≈ 99；dist/index.html、dist/assets 存在
git rm -r --cached --ignore-unmatch .          # 去掉所有源码的跟踪
git add -f .vitepress/dist .github .gitignore  # 只留渲染产物 + 工作流
git commit -m "build: 论文XX"
git push origin build                # 触发 GitHub Actions 部署
```

## 四、目录命名约定
- 用 `vocab` / `listen` / `vocab-words`（非 `vocab-html`），兼容现有站点 URL（`/study/vocab/`、`/study/listen/`），免改 `papers.ts`。
- 每次搬数据前先 `rm -rf` 目标目录再 `cp`，避免已下架论文残留死页。

## 五、自动部署（GitHub Pages = GitHub Actions 模式）
- `.github/workflows/deploy.yml` 监听 `build` 分支 push，上传 `.vitepress/dist` 并部署到 GitHub Pages。
- **必须在仓库 Settings → Pages → Build and deployment → Source 选 "GitHub Actions"**（网页操作）。
- ⚠️ **不要选 "Deploy from a branch"**：那套要求网页在 `docs/` 或根目录，而本仓库产物在 `.vitepress/dist/`，选错会部署错误内容或 404。
- 站点地址：`https://<用户名>.github.io/paper-reading/`
- 若首次运行因 Pages 还没切到 Actions 而失败：去 Actions 标签页进那次运行，点 `Re-run all jobs`。

## 六、agent.md / AGENTS.md / CLAUDE.md 不参与站点构建
- 这三个文件放在**仓库根目录**，供各 AI 工具读取本规约；`AGENTS.md`、`CLAUDE.md` 是 `agent.md` 的软链接。
- 它们**必须留在根目录**（AI 工具只认根目录固定文件名），但**不能进站点**——已在 `.vitepress/config.mts` 的 `srcExclude` 中排除 `agent.md`、`AGENTS.md`、`CLAUDE.md`。
- ⚠️ 切勿把这三个文件挪进 `docs/`、改后缀、或从 `srcExclude` 移除，否则会生成 `agent.html` 等无用页面污染部署。

## 七、护栏（本地）
- `scripts/pre-push`（软链到 `.git/hooks/pre-push`）：推 main 直接拒绝。
- `git config push.default current`：`git push` 只推当前分支。
- 新增/修改 `scripts/pre-push` 后需重做软链：
  `ln -sf ../../scripts/pre-push .git/hooks/pre-push`

## 八、远程 main 分支保护（GitHub 网页）
- 仓库 Settings → Branches → Add branch protection rule，Branch name pattern 填 `main`。
- 勾选 **Require a pull request before merging**（Required approvals 设为 0 即可，个人仓库）。
- 效果：任何人对 main 的直接 push / 合并都被 GitHub 拒绝，必须走 PR。与本地 pre-push 钩子形成双保险。

## 九、网络/代理备注
- 本机 git 配了 `http.proxy=127.0.0.1:7890`（Clash/小火箭）。代理关闭时 `git push` 报 `Failed to connect to 127.0.0.1 port 7890`。
- 推送失败时：开代理重试，或用 `git -c http.proxy= -c https.proxy= push origin <分支>` 临时直连。

## 十、后续规则
用户新增规则直接写到对应小节（或新建小节），AI 工具自动遵循。

## 十一、数据导入位置与构建陷阱（重点，易踩坑）

- 词汇页 / 听力页 / 词表 **不在本仓库内**：生成工具产出在仓库外层同级目录 `papers/vocab-html`、`papers/vocab-listen`、`papers/vocab-words`（本仓库位于 `papers/paper-reading/`，相对即 `../vocab-html` 等）。它们从不会自动进 git，必须按第三节 SOP 手动 `cp` 进 `public/study/vocab|listen|vocab-words` 并 commit，否则仓库里只有空骨架、线上 404。
- ⚠️ 致命陷阱：若 `public/study` 为空就 `npm run build`，生成的 `.vitepress/dist` 不含任何词汇页 → 本地 `dist/index.html` 与线上 GitHub Pages 都打不开词表（404）。**务必先 `cp` 数据、再 build。**
- ⚠️ 导入时只 `cp *.html` 和 `*.json`，**不要连 `vocab-html` 里的 `README_*.md` 一起搬进 `public/study/vocab`**：VitePress 会把它当页面渲染，并因引用图片（如 `imgs/sora.jpg`）报 `Rollup failed to resolve import` 导致构建失败。
- ⚠️ 本机装了腾讯云 Coding Copilot 插件时，`npm run build` 会在清理 `.vitepress/.temp`（800+ 文件）时被 safe-delete 批量删除保护拦截（`SAFE_DELETE_BULK_CONFIRM_REQUIRED`），导致构建报错退出。**解决办法**：构建时禁用该守卫——
  `CODEBUDDY_SAFE_DELETE_ENABLED=0 NODE_OPTIONS= npm run build`
  （`NODE_OPTIONS` 里被注入了 shim，需一并清空；CI 端无此插件，无需处理。）
- 本地预览构建产物：直接浏览器打开 `.vitepress/dist/index.html`（file://），不是 `npm run dev` 临时地址。
- 一句话：原始数据从没"丢"过，只是没进库；导入 + 重建即可恢复。

## 十二、站点内链接必须带 base 前缀（否则 GitHub Pages 404）

- 站点托管在 GitHub Pages **项目页子路径**（`base: '/paper-reading/'`，见 `config.mts` 的 `BASE` 常量）。
- ⚠️ **VitePress 只会给 `themeConfig.nav` 链接和 markdown 链接自动加 base，绝不处理原始 `<a href="/...">` 和 Vue 组件的 `:href`**（浏览器端 router 也不会补 base，见 `node_modules/vitepress/dist/client/app/router.js`）。
- 因此凡是指向 `public/` 静态页（`/study/vocab/*.html`、`/study/listen/*.html`、`index*.html`）或内部路由（`/vocab/`、`/listen/` 等）的链接，**必须**用 `withBase` 包一层：
  ```ts
  import { withBase } from 'vitepress'
  withBase('/study/vocab/GPT2_论文词汇.html')
  ```
- 已处理位置（新增链接时照做）：
  - `.vitepress/theme/papers.ts` —— `vocabUrl` / `listenUrl` / `INDEX_PAGES`
  - `.vitepress/theme/Home.vue` —— 四个分区的 `href`
  - `vocab/index.md`、`listen/index.md` —— 顶部 `<script setup>` 引入 `withBase`，锚点用 `:href="withBase('...')"`
  - `.vitepress/config.mts` —— favicon 用 `` `${BASE}favicon.svg` ``
- 生成的静态学习页（`public/study/**`）内部用**相对链接**，不受 base 影响，无需处理。
- 一句话：站点里任何 `/` 开头的绝对链接，先问自己"加 withBase 了吗"。

## 十三、笔记源路径与 URL 映射（rewrites）+ 构建陷阱

- 笔记源（99 篇 md）在**外层目录** `papers/paper-notes/`（不进本仓库）；构建时拷入构建源 `papers/paper-notes/`，`code` 分支的 `.vitepress/config.mts` 用
  `rewrites: { 'papers/paper-notes/:name': 'paper-notes/:name' }` 把 URL 映射回 `/paper-notes/*.html`
  （讲解区那 99 条 `[📝 笔记区](/paper-notes/X.html)` 链接无需改动）。
- 构建时源目录里的 `papers/paper-notes/` 经 rewrites 落到 `paper-notes/`。
- ⚠️ **渲染崩溃陷阱**：若构建源里同时存在**根目录旧 `paper-notes/`** 与 **`papers/paper-notes/`（rewrites 目标 `paper-notes/:name`）**，
  两条路径映射到同一路由 → VitePress 在 renderPage 阶段抛
  `Cannot read properties of undefined (reading 'imports')` 并中止。**务必在 build 前 `rm -rf paper-notes`**。
- ⚠️ **构建失败绝不推送**：`npm run build` 非 0 退出时 `.vitepress/dist` 已被清空/残缺，此时再 `git add -f .vitepress/dist`
  会把残缺产物推上线 → 线上大面积 404。必须先校验 `dist/paper-notes/*.html` 数量、`dist/index.html`、`dist/assets` 都正常，再提交。
