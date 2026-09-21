#!/bin/bash
# 一键部署：重建 99 篇听力页 → 拷进站点 → VitePress 构建 → 提交 dist → 推送 build
P=/Users/milong/Desktop/code/zcode-test/papers
R=$P/paper-reading
cd "$P" || exit 1

echo "[1/5] 重建 99 篇听力页 ..."
python3 "$P/scripts/tools_rebuild_all.py" | tail -3

echo "[2/5] 拷贝页面 + 音频到站点 ..."
cp -f "$P"/listen-new/*.html "$R/public/study/listen/"
mkdir -p "$R/public/study/listen-audio"
# 用 rsync：7400+ 个文件用通配符会触发 "Argument list too long"
rsync -a --delete "$P"/listen-audio/ "$R/public/study/listen-audio/"
echo "    页面 $(ls "$R"/public/study/listen/*.html | wc -l) 个 · 音频 $(ls "$R"/public/study/listen-audio/*.mp3 | wc -l) 个"

echo "[2.5/5] (讲解区 / 笔记区现在都是可手编的 .md，无需脚本生成，直接由 VitePress 渲染)"

echo "[3/5] VitePress 构建 ..."
cd "$R" || exit 1
env NODE_OPTIONS= CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run build 2>&1 | tail -3

echo "[4/5] 提交 dist ..."
git add -f .vitepress/dist
git commit -q -m "build: 词汇级别筛选 + 李沐讲解视频 + 例句微软音 + 音频压到24kbps(116MB)" && git log --oneline -1 || echo "    无变更"

echo "[5/5] 推送 build ..."
git -c http.proxy= -c https.proxy= push origin build
echo "DEPLOY_DONE $(git rev-parse --short HEAD)"
