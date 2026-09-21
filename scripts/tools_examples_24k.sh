#!/bin/bash
# ① 补全例句微软音 → ② 全站音频压到 24kbps/16kHz 单声道 → ③ 部署
P=/Users/milong/Desktop/code/zcode-test/papers
cd "$P" || exit 1
LOG=/tmp/ex24k.log
: > $LOG

echo "[1/3] 生成例句音频（单词/中文已存在会自动跳过）..." | tee -a $LOG
for f in vocab-words/*.json; do
  env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY \
    python3 gen_paper_audio.py "$f" listen-audio \
      --en en-US-BrianNeural --zh zh-CN-YunyangNeural --rel ../listen-audio >> $LOG 2>&1
done
echo "例句生成完成" | tee -a $LOG
ls "$P"/listen-audio/*.mp3 | wc -l | tee -a $LOG

echo "[2/3] 压缩到 24kbps/16kHz 单声道（输出到 listen-audio-24k）..." | tee -a $LOG
mkdir -p listen-audio-24k
export P
ls "$P"/listen-audio/*.mp3 | xargs -P 8 -I@ bash -c '
  f="@"; o="'"$P"'/listen-audio-24k/$(basename "$f")"
  [ -s "$o" ] && exit 0
  ffmpeg -hide_banner -loglevel error -y -i "$f" -ac 1 -ar 16000 -b:a 24k "$o.tmp" && mv "$o.tmp" "$o"
'
ls "$P"/listen-audio-24k/*.mp3 | wc -l | tee -a $LOG
cp -f "$P"/listen-audio/manifest.json "$P"/listen-audio-24k/manifest.json
du -sh "$P"/listen-audio "$P"/listen-audio-24k | tee -a $LOG

echo "[3/3] 用压缩版替换（原版留作 listen-audio_hifi 备份）..." | tee -a $LOG
cd "$P" || exit 1
rm -rf listen-audio_hifi
mv listen-audio listen-audio_hifi
mv listen-audio-24k listen-audio
du -sh "$P"/listen-audio "$P"/listen-audio_hifi | tee -a $LOG

echo "一键部署 ..." | tee -a $LOG
bash "$P"/scripts/tools_deploy.sh >> $LOG 2>&1
echo "ALL_DONE" | tee -a $LOG
