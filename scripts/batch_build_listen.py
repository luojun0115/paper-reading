#!/usr/bin/env python3
"""批量把 vocab-listen 里的听力页用新版模板重建到 listen-new/。

对应关系：vocab-listen/<名>_听力.html  ←  vocab-words/<名>_论文词汇.json
论文名从旧页的 .ptitle 里提取，标题沿用旧 <title>，保证内容与线上一致。
"""
import os, re, glob, subprocess, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(HERE, "vocab-listen")
JS   = os.path.join(HERE, "vocab-words")
OUT  = os.path.join(HERE, "listen-new")
os.makedirs(OUT, exist_ok=True)

pages = sorted(glob.glob(os.path.join(SRC, "*_听力.html")))
ok, skipped = 0, []
for h in pages:
    name = os.path.basename(h)
    base = name[: -len("_听力.html")]
    j = os.path.join(JS, base + "_论文词汇.json")
    if not os.path.exists(j):
        skipped.append(base + "(无词表)")
        continue
    src = open(h, encoding="utf-8").read()
    m = re.search(r'<div class="ptitle"><i>(.*?)</i></div>', src)
    paper = m.group(1) if m else ""
    t = re.search(r"<title>(.*?)</title>", src)
    title = t.group(1) if t else base + "_论文词汇_听力"
    out = os.path.join(OUT, name)
    r = subprocess.run(
        [sys.executable, os.path.join(HERE, "build_listen_qq.py"), j, out, paper, "--title", title],
        capture_output=True, text=True)
    if r.returncode != 0:
        skipped.append(base + "(build失败:" + (r.stderr or r.stdout).strip()[:50] + ")")
        continue
    ok += 1

print("生成成功 %d / %d 篇" % (ok, len(pages)))
if skipped:
    print("跳过 %d 篇: %s" % (len(skipped), ", ".join(skipped[:10])))
