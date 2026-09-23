# agent.md — 深读馆 DeepRead 协作规则

> 项目级 AI 协作规约。Claude / Codebuddy / Cursor / Cline / Trae / Qoder / OpenCode
> 等打开本仓库都必须遵守。用户后续新增规则直接追加到本文件即可生效。
> 本文件放在仓库根目录；`AGENTS.md` 与 `CLAUDE.md` 是其软链接，覆盖更多工具。

## 一、仓库身份
- 深读馆 DeepRead（paper-reading，npm name: deepread），VitePress 论文带读站。
- 构建：`npm run build` → `.vitepress/dist/`。
- 站点只发布 `public/` 下静态文件。
- 仓库位于外层 **`papers/paper-reading/`**。外层 `papers/` 下与仓库并列、由**用户自行管理**的目录：

  | 外层目录 | 内容 | AI 处置 |
  |---|---|---|
  | `paper-llm/` | 论文原件（PDF，输入源） | **只读，不擅动** |
  | `paper-notes/` | 带读笔记（99 篇 md），构建时拷入 | **只读，不擅动** |
  | `paper-video/` | 视频素材 | **只读，不擅动** |

- **生成页 / 词表 / 音频已在仓库内**：`code` 分支的 `public/study/{vocab,listen,vocab-words,listen-audio}/`，随仓库 git 跟踪。
- **站点子路径**：因托管在 GitHub Pages 项目页，`.vitepress/config.mts` 已设 `base: '/paper-reading/'`；改仓库名时同步改 base。

## 二、分支模型（必须遵守）
| 分支 | 职责 | 内容 |
|---|---|---|
| main | 受保护基线 | 永不提交/合并/推送（远程 main 仅含 README；`imgs/` 已删） |
| ~~work~~ | **已删除** | 该分支已废弃删除（原内容全部并入 `code`）；笔记源在外层 `papers/paper-notes/`，构建时拷入（见第十三节） |
| code | 代码/构建页分支 | VitePress 项目源码 + 生成页 `public/study/**`（词汇页/听力页/词表/听力音频）+ `data/`（`papers.json`、`wordlists/`）+ `scripts/`（工具链）+ `temp/`（生成物临时区，git 忽略） |
| build | 渲染产物分支 | **只放渲染产物** `.vitepress/dist/`（外加必需的工作流 `.github/` 与 `.gitignore`）；**源码一律不入库** |

### 禁止
- 禁止 push main（本地 pre-push 钩子拒绝；远程 main 也设了分支保护，见第八节）。
- 跨分支取内容用 `git checkout <分支> -- <路径>` 取快照；禁止 `git merge` 把 `code` 的内容混进 `build`（避免源码污染产物分支）。
- ⚠️ **build 分支禁止提交源码**；构建后只 `git add -f .vitepress/dist .github .gitignore`，源码用 `git rm -r --cached --ignore-unmatch .` 取消跟踪。

## 三、日常流程

### A. 笔记（paper-notes）——在外层 `papers/paper-notes/`，不进仓库
```bash
#   直接编辑外层目录（不纳入 git）：
#   /Users/milong/Desktop/code/zcode-test/papers/paper-notes/XX.md
#   对外 URL 仍是 /paper-notes/XX.html（构建时拷入 + code 的 rewrites 映射，见第三节 C、第十三节）
```

### B. 词汇页 / 听力页 / 音频——归 code（已入库，新内容走 temp）
这些内容**已在仓库内**（`public/study/**`），随仓库 git 跟踪。新增/更新时走 temp 流程：
```bash
# 1) 生成脚本把产物输出到 temp/（git 忽略）
#    temp/vocab/ · temp/listen/ · temp/vocab-words/ · temp/listen-audio/

# 2) 确认无误后同步进正式目录（源目录缺失会自动跳过）
node scripts/sync-study-pages.mjs

# 3) 提交（如需新增论文条目，编辑 data/papers.json：slug 与文件名一致，listen:true）
git add public/study data/papers.json && git commit -m "site: 更新学习页"
```
> 重建听力页：`python3 scripts/tools_rebuild_all.py`（就地重建 `public/study/listen/`）。

### C. 构建部署——build 分支只提交渲染产物
**一键**：`bash scripts/tools_deploy.sh`
（流程：切 build 取源码 → 检测外层 `paper-notes` 指纹 → 拷入笔记 → 构建 → 校验 → 只提交 dist → 推送。任一步失败即中止，绝不推残缺产物。）

等价手动步骤：
```bash
git switch build
git reset --hard origin/build        # 起点（build 分支只有 dist）
git checkout code -- .               # 源码 + public/study 生成页/音频
mkdir -p papers/paper-notes && cp -R ../paper-notes/. papers/paper-notes/   # 从外层 papers/paper-notes 只读拷入笔记源
#   🚫 不要写 rm -rf paper-notes：外层 papers/paper-notes 是用户原文件；产物里的 paper-notes/ 是渲染出的 HTML，均无需删除。
CODEBUDDY_SAFE_DELETE_ENABLED=0 NODE_OPTIONS= npm run build
# 校验：dist/paper-notes/*.html ≈ 99；dist/index.html、dist/assets 存在
git rm -r --cached --ignore-unmatch .                  # 去掉所有源码的跟踪
git add -f .vitepress/dist .github .gitignore .paper-notes.sha
git commit -m "build: 站点更新"
git push origin build                                  # 触发 GitHub Actions 部署
```

## 四、目录命名约定
- 正式目录：`public/study/` 下的 `vocab` / `listen` / `vocab-words` / `listen-audio`，对应站点 URL `/study/vocab/`、`/study/listen/`，免改 `papers.ts`。
  （历史上的 `vocab-html` / `vocab-listen` / `listen-new` 等外层目录已废弃删除，**不要再引用**。）
- 临时目录：仓库内 `temp/`（git 忽略），生成物先落这里。
- 每次搬数据前先清目标目录再拷，避免已下架论文残留死页。

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

- 词汇页 / 听力页 / 词表 / 音频 **已在仓库内**：`code` 分支 `public/study/{vocab,listen,vocab-words,listen-audio}/`，随仓库 git 跟踪。新内容走「temp → `sync-study-pages.mjs` → 提交」（见第三节 B）。
- ⚠️ 致命陷阱：若 `public/study` 为空就 `npm run build`，生成的 `.vitepress/dist` 不含任何词汇页 → 本地 `dist/index.html` 与线上 GitHub Pages 都打不开词表（404）。**务必先 `cp` 数据、再 build。**
- ⚠️ 导入时只拷 `*.html` 和 `*.json`，**不要把生成目录里的 `README_*.md` 搬进 `public/study/vocab`**：VitePress 会把它当页面渲染，并因引用图片报 `Rollup failed to resolve import` 导致构建失败。
- ⚠️ 本机装了腾讯云 Coding Copilot 插件时，`npm run build` 会在清理 `.vitepress/.temp`（800+ 文件）时被 safe-delete 批量删除保护拦截（`SAFE_DELETE_BULK_CONFIRM_REQUIRED`），导致构建报错退出。**解决办法**：构建时禁用该守卫——
  `CODEBUDDY_SAFE_DELETE_ENABLED=0 NODE_OPTIONS= npm run build`
  （`NODE_OPTIONS` 里被注入了 shim，需一并清空；CI 端无此插件，无需处理。）
- 本地预览构建产物：直接浏览器打开 `.vitepress/dist/index.html`（file://），不是 `npm run dev` 临时地址。
- 一句话：生成物先进 `temp/`，确认后 sync 进 `public/study/`，再构建。

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
- **更新检测**：`scripts/tools_deploy.sh` 会对外层 `paper-notes` 计算指纹并存到 `.paper-notes.sha`，与上次构建比对，有更新则提示并纳入本次构建。
- ℹ️ **历史坑（已填平，勿再动刀）**：早年笔记曾放在仓库**根目录** `paper-notes/`，与 `papers/paper-notes/`（rewrites 目标同为 `/paper-notes/:name`）**撞路由**，
  导致 VitePress 在 renderPage 抛 `Cannot read properties of undefined (reading 'imports')`。
  现状：`build` 分支只含 `.vitepress/dist`，**根目录 `paper-notes/` 已不存在**（实测 0 个），该冲突不会再发生。
- 🚫 **绝对禁止**：对外层 `papers/paper-notes/`（**用户原文件**）执行任何 `rm` / 修改 / 移动 —— 构建只**读取并拷贝**它。
  同理，构建流程里**不要再加** `rm -rf paper-notes` 这类删除动作：构建产物中的 `paper-notes/` 是渲染出来的 HTML，与笔记源无关。
- ⚠️ **构建失败绝不推送**：`npm run build` 非 0 退出时 `.vitepress/dist` 已被清空/残缺，此时再 `git add -f .vitepress/dist`
  会把残缺产物推上线 → 线上大面积 404。必须先校验 `dist/paper-notes/*.html` 数量、`dist/index.html`、`dist/assets` 都正常，再提交。

## 十四、素材生成工作流（temp 在仓库内，删前必问）

当用户往外层 `paper-llm/` 放入论文（PDF / 文章），并要求生成「单词表 / 听力表」等内容时，**一律按下面流程**：

1. **先建 temp**：在**仓库内**建临时目录 `<repo>/temp/`（已在 `.gitignore` 中，不进 git、不影响构建）。
2. **所有产物先落到 temp**：生成的中间素材一律写到 `temp/` 下，例如
   `temp/vocab/`、`temp/listen/`、`temp/vocab-words/`、`temp/listen-audio/`。
   —— temp 里随便生成、随便试错，不用管最终仓位。
3. **构建前「搬家」**：确认无误后执行 `node scripts/sync-study-pages.mjs`，
   把 `temp/` 里确定要发布的产物搬进正式目录 `public/study/**`（源目录缺失自动跳过）。
4. **构建部署**：`bash scripts/tools_deploy.sh`（含笔记更新检测 → 构建 → 校验 → 提交 dist → 推送）。
5. **清理**：构建部署成功后，**先询问用户**是否删除 `temp/`；
   ⚠️ **用户未回答 → 默认不删除**。（构建失败则保留 temp 便于排查。）

一句话：**生成物先全放 `temp/`，确认后 sync 进 `public/study/`，构建成功后问过用户再删 temp。**

### 纪律（必须遵守）
- **只有 `code`（源码 + `temp/`）和 `build`（产物）承载构建相关内容**，其它目录不放构建文件 / 生成物。
- 外层 `papers/` 下的 `paper-llm/`、`paper-notes/`、`paper-video/` 由**用户自行管理**，AI **只读不擅动**。
- 分支只有 `main`（受保护）/ `code`（工作）/ `build`（产物）；`work` 分支已删除。
