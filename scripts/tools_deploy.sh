#!/bin/bash
# 一键构建部署：
#   ① 准备构建源（build 分支 + code 源码）
#   ② 检测外层 papers/paper-notes 是否有更新 → 纳入构建
#   ③ VitePress 构建 → 校验 → 产物提交到 build 分支 → 推送（Actions 自动部署）
set -o pipefail
R="$(cd "$(dirname "$0")/.." && pwd)"        # 仓库根 paper-reading
P="$(cd "$R/.." && pwd)"                      # papers/
NOTES="$P/paper-notes"
cd "$R" || exit 1

echo "[1/6] 切到 build 分支准备构建源 ..."
git switch -f build || exit 1
git reset --hard origin/build || exit 1
git checkout code -- . || exit 1

echo "[2/6] 检测外层 paper-notes 是否有更新 ..."
H="$(find "$NOTES" -type f -name '*.md' -exec shasum {} + 2>/dev/null | sort | shasum | awk '{print $1}')"
if [ -z "$H" ]; then echo "    !! 取不到 paper-notes 指纹，检查：$NOTES"; exit 1; fi
OLD="$(cat .paper-notes.sha 2>/dev/null || echo -)"
if [ "$H" = "$OLD" ]; then echo "    paper-notes 无更新"; else echo "    paper-notes 有更新 → 纳入本次构建"; fi

echo "[3/6] 纳入笔记源 ..."
mkdir -p papers/paper-notes
cp -R "$NOTES"/. papers/paper-notes/ || exit 1
rm -rf paper-notes     # 清掉可能与 rewrites 目标冲突的根目录旧 paper-notes
echo "    笔记 $(ls papers/paper-notes/*.md 2>/dev/null | wc -l) 篇"

echo "[4/6] VitePress 构建 ..."
env NODE_OPTIONS= CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run build 2>&1 | tail -3
if [ ! -f .vitepress/dist/index.html ]; then echo "!! 构建失败，中止（不推送残缺产物）"; exit 1; fi
PN=$(ls .vitepress/dist/paper-notes/*.html 2>/dev/null | wc -l)
echo "    dist/paper-notes = $PN"
if [ "$PN" -lt 1 ]; then echo "!! 产物缺 paper-notes，中止"; exit 1; fi

echo "[5/6] 提交产物（build 分支只放 dist）..."
git rm -r --cached --ignore-unmatch . >/dev/null 2>&1
echo "$H" > .paper-notes.sha                  # 记录本次构建所用笔记指纹
git add -f .vitepress/dist .github .gitignore .paper-notes.sha || exit 1
git commit -q -m "build: 站点更新" && git log --oneline -1 || echo "    无变更"

echo "[6/6] 推送 build（触发 Actions 部署）..."
git -c http.proxy= -c https.proxy= push origin build
echo "DEPLOY_DONE $(git rev-parse --short HEAD)"
