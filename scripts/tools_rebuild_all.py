#!/usr/bin/env python3
"""用新模板重建 public/study/listen 下所有听力页（论文名从各自旧页面里取，保证一致）
用法: python3 tools_rebuild_all.py
"""
import os, re, subprocess, glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # 仓库根 paper-reading/
SRC = os.path.join(BASE, "public", "study", "vocab-words")           # 词表 json
DST = os.path.join(BASE, "public", "study", "listen")                # 听力页（就地重建）

def ptitle_of(html_path):
    try:
        s = open(html_path, encoding="utf-8").read(80000)
        m = re.search(r'id="ptitle">([^<]*)', s)
        return (m.group(1) if m else "").strip()
    except Exception:
        return ""

ok = skip = 0
withaudio = noaudio = 0
fails = []
for vp in sorted(glob.glob(os.path.join(SRC, "*.json"))):
    base = os.path.basename(vp).replace("_论文词汇.json", "")
    page = os.path.join(DST, base + "_听力.html")
    if not os.path.exists(page):
        skip += 1
        continue
    cmd = ["python3", os.path.join(BASE, "scripts", "build_listen_qq.py"), vp, page]
    pt = ptitle_of(page)
    if pt:
        cmd.append(pt)
    cmd += ["--title", os.path.basename(page).rsplit(".", 1)[0]]
    r = subprocess.run(cmd, cwd=BASE, capture_output=True, text=True)
    if r.returncode == 0:
        ok += 1
        if "本地音色" in r.stdout:
            withaudio += 1
        else:
            noaudio += 1
    else:
        fails.append(base + " :: " + r.stderr.strip()[-140:])

print(f"重建成功 {ok} 篇 · 跳过(无对应页面) {skip} 篇")
print(f"其中有本地微软音 {withaudio} 篇 · 无本地语音 {noaudio} 篇")
for f in fails[:5]:
    print("FAIL", f)
# 抽验新代码是否注入
chk = os.path.join(DST, "AlexNet_听力.html")
if os.path.exists(chk):
    s = open(chk, encoding="utf-8").read()
    print("模板新代码注入:", "暂不可用" in s, "| 音色选择器:", "segEnVoice" in s)
