#!/usr/bin/env python3
"""把 listen-audio 里所有 mp3 压到 24kbps/16kHz 单声道，输出到 listen-audio-24k。
可续跑（已存在的跳过）。用法: python3 tools_compress24k.py [--swap]
--swap: 压缩完且数量校验通过后，把原版改名为 listen-audio_hifi、压缩版顶上
"""
import os, sys, shutil, subprocess
import concurrent.futures as cf

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "listen-audio")
DST = os.path.join(BASE, "listen-audio-24k")
BAK = os.path.join(BASE, "listen-audio_hifi")

os.makedirs(DST, exist_ok=True)
files = sorted(f for f in os.listdir(SRC) if f.endswith(".mp3"))
print(f"待压缩 {len(files)} 个文件", flush=True)

def one(fn):
    src, dst, tmp = os.path.join(SRC, fn), os.path.join(DST, fn), os.path.join(DST, fn + ".tmp")
    if os.path.exists(dst) and os.path.getsize(dst) > 500:
        return "skip"
    r = subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", src,
                        "-ac", "1", "-ar", "16000", "-b:a", "24k", "-f", "mp3", tmp],
                       capture_output=True)
    if r.returncode == 0 and os.path.exists(tmp) and os.path.getsize(tmp) > 500:
        os.replace(tmp, dst)
        return "ok"
    if os.path.exists(tmp):
        os.remove(tmp)
    print("  失败:", fn, r.stderr.decode()[:90], flush=True)
    return "fail"

done = 0
counts = {"ok": 0, "skip": 0, "fail": 0}
with cf.ThreadPoolExecutor(8) as ex:
    for r in ex.map(one, files):
        counts[r] = counts.get(r, 0) + 1
        done += 1
        if done % 2000 == 0:
            print(f"  进度 {done}/{len(files)}  新压 {counts['ok']} 跳过 {counts['skip']} 失败 {counts['fail']}", flush=True)

print(f"压缩完成: 新压 {counts['ok']} · 跳过 {counts['skip']} · 失败 {counts['fail']}", flush=True)

out = [f for f in os.listdir(DST) if f.endswith(".mp3")]
src_size = sum(os.path.getsize(os.path.join(SRC, f)) for f in files)
dst_size = sum(os.path.getsize(os.path.join(DST, f)) for f in out)
print(f"原版 {len(files)} 个 {src_size/1024/1024:.1f} MB → 压缩版 {len(out)} 个 {dst_size/1024/1024:.1f} MB "
      f"(省 {100-dst_size/src_size*100:.0f}%)", flush=True)

if "--swap" in sys.argv:
    if len(out) < len(files):
        print("!! 压缩版文件数不足，放弃替换", flush=True)
        sys.exit(1)
    shutil.copy(os.path.join(SRC, "manifest.json"), os.path.join(DST, "manifest.json"))
    if os.path.isdir(BAK):
        shutil.rmtree(BAK)
    os.rename(SRC, BAK)
    os.rename(DST, SRC)
    print(f"已替换：原版备份在 {BAK}（确认没问题后可以删）", flush=True)
