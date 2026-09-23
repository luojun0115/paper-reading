# 深读馆 DeepRead 工作流程

> 本文件是「怎么做」的操作手册，与根目录 `agent.md`（协作规约）互为补充。
> 本文件位于 `docs/`，已在 `.vitepress/config.mts` 的 `srcExclude` 中排除，**不会被构建成站点页面**。

---

## 一、总览：东西都放在哪

```
papers/                            ← 外层（用户自行管理，AI 只读）
├── paper-llm/                       论文原件 PDF —— 输入源
├── paper-notes/                     带读笔记 99 篇 md —— 用户原文件
├── paper-video/                     视频素材
└── paper-reading/                 ← Git 仓库（AI 在这里工作）
    ├── main                         受保护基线，永不提交
    ├── code                         源码 + 生成页 + 工具链 + temp/
    └── build                        只放渲染产物 .vitepress/dist
```

### `code` 分支内容
| 路径 | 说明 |
|---|---|
| `.vitepress/` | VitePress 配置（`config.mts`：base、rewrites、srcExclude）与主题 |
| `index.md`、`explain/`、`listen/`、`reading/`、`vocab/`、`design/` | 站点页面源 |
| `public/study/{vocab,listen,vocab-words,listen-audio}/` | 生成好的学习页与音频（站点直接发布） |
| `data/` | `papers.json`（论文清单）、`wordlists/`（词表源数据） |
| `scripts/` | 生成 / 同步 / 构建 / 校验 工具链 |
| `temp/` | **生成物临时区**（git 忽略） |

### `build` 分支内容
只放 `.vitepress/dist/`（渲染产物）+ `.github/`（部署工作流）+ `.gitignore` + `.paper-notes.sha`（笔记指纹）。

---

## 二、核心纪律（红线）

1. **只有 `code`（源码 + `temp/`）和 `build`（产物）承载构建相关内容**，其它目录不放构建文件 / 生成物。
2. **外层 `paper-llm/`、`paper-notes/`、`paper-video/` 是用户原文件 / 输入源，AI 只读，绝不 `rm` / 修改 / 移动。**
3. 构建流程中**不得出现任何删除笔记的动作**（如 `rm -rf paper-notes`）。构建产物里的 `paper-notes/` 是渲染出的 HTML，与笔记源无关。
4. 分支只有 `main` / `code` / `build`（`work` 分支已删除）；禁止把源码混进 `build`。
5. 构建失败时 `.vitepress/dist` 会是残缺的，**绝不推送**，修好再构建。

---

## 三、三类任务的流程

### A. 新加一篇论文（生成单词表 / 听力表）

```
① 用户把论文放进  papers/paper-llm/
        │
② 在 code 分支开工，生成物先全落  <repo>/temp/
   （temp/vocab · temp/listen · temp/vocab-words · temp/listen-audio）
        │
③ 确认无误 →  node scripts/sync-study-pages.mjs
   把 temp/ 里的产物搬进 public/study/**（源目录缺失自动跳过）
        │
④ 提交：git add public/study data/papers.json && git commit
        │
⑤ 构建部署：bash scripts/tools_deploy.sh
        │
⑥ 部署成功后，询问用户是否删除 temp/；用户未回答 → 默认不删除
```

### B. 写 / 改笔记（paper-notes）

```
直接编辑外层  papers/paper-notes/XX.md（用户原文件，不纳入 git）
        │
对外 URL 自动是  /paper-notes/XX.html
（靠 config.mts 的 rewrites 映射，讲解区 99 条链接无需改动）
        │
构建时 tools_deploy.sh 会计算该目录指纹，与 .paper-notes.sha 比对，
有更新则纳入本次构建
```

### C. 构建部署（build 分支只放产物）

**一键**：
```bash
bash scripts/tools_deploy.sh
```

内部步骤：
```
① 切 build 分支 + reset 到 origin/build + 取 code 源码
② 检测外层 paper-notes 指纹（.paper-notes.sha）
③ 只读拷贝笔记 → papers/paper-notes/
④ VitePress 构建（带 safe-delete 守卫绕过）
⑤ 校验：dist/index.html、dist/assets、dist/paper-notes/*.html 存在
⑥ 只提交 dist → git push origin build
⑦ GitHub Actions 自动部署到 Pages
```
任一步失败即中止，绝不推残缺产物。

---

## 四、常用命令速查

```bash
# 同步生成物：temp/ → public/study/**
node scripts/sync-study-pages.mjs

# 就地重建听力页（public/study/listen/）
python3 scripts/tools_rebuild_all.py

# 一键构建部署
bash scripts/tools_deploy.sh

# 检查音频覆盖率
python3 scripts/tools_audit_coverage.py

# 例句音频补全 + 压缩到 24k + 部署
bash scripts/tools_examples_24k.sh
```

> 构建必须带守卫绕过：
> `CODEBUDDY_SAFE_DELETE_ENABLED=0 NODE_OPTIONS= npm run build`
> （本机装了腾讯云 Coding Copilot 插件时，清理 `.vitepress/.temp` 会被 safe-delete 批量保护拦截。）

---

## 五、已知坑与历史教训

### 1. 笔记路由冲突（**已填平，勿再动刀**）
早年笔记曾放在仓库**根目录** `paper-notes/`，与 `papers/paper-notes/`（rewrites 目标同为 `/paper-notes/:name`）**撞路由**，
导致 VitePress 在 renderPage 抛 `Cannot read properties of undefined (reading 'imports')`。

- 现状：`build` 分支只含 `.vitepress/dist`，根目录 `paper-notes/` **已不存在**（实测 0 个），冲突不会再发生。
- 曾经的解决办法是在构建前 `rm -rf paper-notes` —— **现已废弃删除**。

### 2. 构建失败却被推送（曾导致线上大面积 404）
`npm run build` 失败时 `.vitepress/dist` 已被清空/残缺，此时再 `git add -f` 会把残缺产物推上线。
**必须先校验** `dist/paper-notes/*.html` 数量、`dist/index.html`、`dist/assets` 都正常，再提交推送。

### 3. 站点内链接必须带 base 前缀
站点是 GitHub Pages 项目页（`base: '/paper-reading/'`）。VitePress **不会**给原始 `<a href="/...">` 和 Vue 组件的 `:href` 自动加 base，必须用 `withBase()` 包一层。

### 4. 生成目录里的 `README_*.md` 不要搬进 `public/study/`
VitePress 会把它当页面渲染，并因引用图片报 `Rollup failed to resolve import` 导致构建失败。只拷 `*.html` 和 `*.json`。

---

## 六、环境备注

- **网络/代理**：本机 git 配了 `http.proxy=127.0.0.1:7890`（Clash）。代理关闭时 `git push` 会报 `Failed to connect to 127.0.0.1 port 7890`。
  推送失败可：`git -c http.proxy= -c https.proxy= push origin <分支>` 临时直连，或开启代理重试。
- **护栏**：`scripts/pre-push`（软链到 `.git/hooks/pre-push`）拒绝推 `main`。
- **GitHub 容量**：单文件 >50 MiB 警告、>100 MiB 硬拒；仓库建议 <1 GB、强烈建议 <5 GB。
  本站音频 `public/study/listen-audio/` 约 1.4 万个 mp3（压缩后约 116 MB），文件数多但体积可控。
