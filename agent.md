# agent.md — 深读馆 DeepRead 协作规则

> 项目级 AI 协作规约。Claude / Codebuddy / Cursor / Cline / Trae / Qoder / OpenCode
> 等打开本仓库都必须遵守。用户后续新增规则直接追加到本文件即可生效。

## 一、仓库身份
- 深读馆 DeepRead（paper-reading，npm name: deepread），VitePress 论文带读站。
- 构建：`npm run build` → `.vitepress/dist/`。
- 站点只发布 `public/` 下静态文件；论文 PDF 在外层 `paper-lm/`，不进本仓库。
- 数据由生成工具产出到外层 `papers/vocab-html`、`papers/vocab-listen`（sync 脚本原读取位置）。

## 二、分支模型（必须遵守）
| 分支 | 职责 | 内容 |
|---|---|---|
| main | 受保护基线 | 永不提交/合并/推送（远程 main 仅含 imgs + README） |
| work | 数据分支 | 词汇页/听力页/词表，落 `public/study/vocab`、`public/study/listen`、`public/study/vocab-words`；`.gitignore` 放行 `public/study/` |
| code | 项目分支 | VitePress 项目源码 + 把 work 数据整合进来 + `data/papers.json` 清单；`.gitignore` 放行 `public/study/` |
| build | 产物分支 | 仅存 `.vitepress/dist`，用于部署 |

### 禁止
- 禁止 push main（pre-push 钩子拒绝）。
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

# ③ build：构建产物
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

## 五、自动部署（GitHub Actions）
- `.github/workflows/deploy.yml` 监听 `build` 分支 push，把 `.vitepress/dist` 部署到 GitHub Pages。
- 需在 GitHub 仓库 Settings → Pages → Source 选 "GitHub Actions"（网页操作）。

## 六、护栏
- `scripts/pre-push`（软链到 `.git/hooks/pre-push`）：推 main 直接拒绝。
- `git config push.default current`：`git push` 只推当前分支。

## 七、后续规则
用户新规直接写对应小节，AI 自动遵循。
