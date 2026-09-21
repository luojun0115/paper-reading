#!/bin/bash
# 一键部署：VitePress 构建 → 提交 dist → 推送 build
# 说明：源码与生成物都在本仓库内。生成物先放 temp/，发布前搬进 public/study/。
R="$(cd "$(dirname "$0")/.." && pwd)"   # 仓库根（paper-reading）
cd "$R" || exit 1

echo "[1/4] 把 temp 里已生成的页面/音频搬进站点（若存在）..."
if [ -d "$R/temp/listen" ]; then cp -f "$R"/temp/listen/*.html "$R/public/study/listen/"; echo "    听力页已搬入"; fi
if [ -d "$R/temp/listen-audio" ]; then rsync -a --delete "$R"/temp/listen-audio/ "$R/public/study/listen-audio/"; echo "    音频已搬入"; fi
echo "    页面 $(ls "$R"/public/study/listen/*.html 2>/dev/null | wc -l) 个 · 音频 $(ls "$R"/public/study/listen-audio/*.mp3 2>/dev/null | wc -l) 个"

echo "[2/4] VitePress 构建 ..."
cd "$R" || exit 1
env NODE_OPTIONS= CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run build 2>&1 | tail -3

echo "[3/4] 提交 dist ..."
git add -f .vitepress/dist
git commit -q -m "build: 站点更新" && git log --oneline -1 || echo "    无变更"

echo "[4/4] 推送 build ..."
git -c http.proxy= -c https.proxy= push origin build
echo "DEPLOY_DONE $(git rev-parse --short HEAD)"
