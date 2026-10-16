#!/bin/bash
# ① 补全例句微软音 → ② 全站音频压到 24kbps/16kHz 单声道 → ③ 部署
R="$(cd "$(dirname "$0")/.." && pwd)"   # 仓库根（paper-reading）
cd "$R" || exit 1
LOG=/tmp/ex24k.log
: > $LOG
AUDIO="$R/public/study/listen-audio"     # 正式音频（仓库内）
TMP="$R/temp"                            # 临时区

echo "[1/3] 生成例句音频（单词/中文已存在会自动跳过）..." | tee -a $LOG
for f in "$R"/public/study/vocab-words/*.json; do
  [ -f "$f" ] || continue
  env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY \
    python3 "$R/scripts/gen_paper_audio.py" "$f" "$AUDIO" \
      --en en-US-BrianNeural --zh zh-CN-YunyangNeural --rel ../listen-audio >> $LOG 2>&1
done
echo "例句生成完成" | tee -a $LOG
ls "$AUDIO"/*.mp3 | wc -l | tee -a $LOG

echo "[2/3] 压缩到 24kbps/16kHz 单声道（输出到 temp/listen-audio-24k）..." | tee -a $LOG
mkdir -p "$TMP/listen-audio-24k"
export AUDIO TMP
ls "$AUDIO"/*.mp3 | xargs -P 8 -I@ bash -c '
  f="@"; o="$TMP/listen-audio-24k/$(basename "$f")"
  [ -s "$o" ] && exit 0
  ffmpeg -hide_banner -loglevel error -y -i "$f" -ac 1 -ar 16000 -b:a 24k "$o.tmp" && mv "$o.tmp" "$o"
'
ls "$TMP"/listen-audio-24k/*.mp3 | wc -l | tee -a $LOG
cp -f "$AUDIO/manifest.json" "$TMP/listen-audio-24k/manifest.json"
du -sh "$AUDIO" "$TMP/listen-audio-24k" | tee -a $LOG

echo "[3/3] 用压缩版替换（原版留作 temp/listen-audio_hifi 备份）..." | tee -a $LOG
rm -rf "$TMP/listen-audio_hifi"
mv "$AUDIO" "$TMP/listen-audio_hifi"
mv "$TMP/listen-audio-24k" "$AUDIO"
du -sh "$AUDIO" "$TMP/listen-audio_hifi" | tee -a $LOG

echo "一键部署 ..." | tee -a $LOG
bash "$R"/scripts/tools_deploy.sh >> $LOG 2>&1
echo "ALL_DONE" | tee -a $LOG
