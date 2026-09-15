# agent.md — 深读馆 DeepRead 协作规则

> 项目级 AI 协作规约。Claude / Codebuddy / Cursor / Cline / Trae / Qoder / OpenCode
> 等打开本仓库都必须遵守。用户后续新增规则直接追加到本文件即可生效。
> 本文件放在仓库根目录；`AGENTS.md` 与 `CLAUDE.md` 是其软链接，覆盖更多工具。

## 一、仓库身份
- 深读馆 DeepRead（paper-reading，npm name: deepread），VitePress 论文带读站。
- 构建：`npm run build` → `.vitepress/dist/`。
- 站点只发布 `public/` 下静态文件；论文 PDF 在外层 `paper-lm/`，不进本仓库。
- 数据由生成工具产出到外层 `papers/vocab-html`、`papers/vocab-listen`（sync 脚本原读取位置）。
- **站点子路径**：因托管在 GitHub Pages 项目页，`.vitepress/config.mts` 已设 `base: '/paper-reading/'`；改仓库名时同步改 base。

## 二、分支模型（必须遵守）
| 分支 | 职责 | 内容 |
|---|---|---|
| main | 受保护基线 | 永不提交/合并/推送（远程 main 仅含 imgs + README） |
| work | 数据分支 | 词汇页/听力页/词表，落 `public/study/vocab`、`public/study/listen`、`public/study/vocab-words`；`.gitignore` 放行 `public/study/` |
| code | 项目分支 | VitePress 项目源码 + 把 work 数据整合进来 + `data/papers.json` 清单；`.gitignore` 放行 `public/study/` |
| build | 产物分支 | 仅存 `.vitepress/dist`，用于部署 |

### 禁止
- 禁止 push main（本地 pre-push 钩子拒绝；远程 main 也设了分支保护，见第八节）。
- 跨分支取内容用 `git checkout <分支> -- <路径>` 取快照；禁止 `git merge work` / `git merge code`（避免草稿历史污染）。

## 三、日常流程（新增一篇论文 + 单词表 + 词汇页）
```bash
# ① work：放数据
git switch work
cp -r ../vocab-html/* public/study/vocab/
cp -r ../vocab-listen/* public/study/listen/
cp -r ../vocab-words/* public/study/vocab-words/
git add public/study/ && git commit -m "data: 论文XX"

# ② code：整合 + 更新清单
git switch code
git checkout work -- public/study
#   编辑 data/papers.json 加条目（slug 与文件名一致，listen:true）
git add public/study/ data/papers.json && git commit -m "site: 论文XX 入站"

# ③ build：构建产物（推送即触发自动部署）
git switch build
git checkout code -- .
rm -rf public/study && git checkout code -- public/study   # 清残留，避免死页
npm run build
git add -f .vitepress/dist && git commit -m "build: 论文XX"
git push -u origin build     # 触发 GitHub Actions 部署
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
- 本机若装了腾讯云 Coding Copilot 插件，`npm run build` 可能在最后清理 `.vitepress/.temp` 时因 safe-delete 批量删除保护（`SAFE_DELETE_BULK_CONFIRM_REQUIRED`）报错退出。此时 dist 已生成完毕，属误报，直接 `git add -f .vitepress/dist && commit && push` 即可；CI 端无此插件，构建正常。
- 本地预览构建产物：直接浏览器打开 `.vitepress/dist/index.html`（file://），不是 `npm run dev` 临时地址。
- 一句话：原始数据从没"丢"过，只是没进库；导入 + 重建即可恢复。
