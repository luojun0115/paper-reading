#!/usr/bin/env python3
"""全站扫描：每个词表里的词，是否都有本地微软音频（单词/中文/例句）"""
import os, json, glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
man = json.load(open(os.path.join(BASE, "listen-audio", "manifest.json"), encoding="utf-8"))
BRIAN = man.get("en-US-BrianNeural", {})
W = BRIAN.get("w", {})
M = man.get("zh-CN-YunyangNeural", {}).get("m", {})
E = BRIAN.get("e", {})

def words_of(path):
    try:
        d = json.load(open(path, encoding="utf-8"))
    except Exception:
        return []
    out = []
    if not isinstance(d, list) or not d or not isinstance(d[0], dict):
        return out
    for s in d:
        for it in s.get("words", []):
            out.append((it.get("w", "").strip(), (it.get("m") or "").strip(), (it.get("ex") or "").strip()))
    return out

import re
strip_pos = lambda s: re.sub(r'^[A-Za-z]+\.\s*', '', s or "")
PAREN = re.compile(r'[（(][^）)]*[A-Za-z][^）)]*[）)]')
clean_zh = lambda s: re.sub(r'\s+', ' ', PAREN.sub('', s or "")).strip()

total = 0
missW, missM, missE = [], [], []
per = []
for vp in sorted(glob.glob(os.path.join(BASE, "vocab-words", "*.json"))):
    items = words_of(vp)
    if not items:
        continue
    total += len(items)
    mw = [w for w, m, e in items if w and w.lower() not in W]
    mm = [m for w, m, e in items if clean_zh(strip_pos(m)) and clean_zh(strip_pos(m)) not in M]
    me = [e for w, m, e in items if e and e not in E]
    missW += [(os.path.basename(vp), w) for w in mw]
    missM += [(os.path.basename(vp), m) for m in mm]
    missE += [(os.path.basename(vp), e) for e in me]
    if mw or mm or me:
        per.append((os.path.basename(vp), len(mw), len(mm), len(me)))

print(f"全站词条 {total}")
print(f"缺单词音 {len(missW)} ({len(missW)/total*100:.1f}%)")
print(f"缺中文音 {len(missM)} ({len(missM)/total*100:.1f}%)")
print(f"缺例句音 {len(missE)} ({len(missE)/total*100:.1f}%)")
print("\n缺单词音样例:", missW[:12])
print("缺中文音样例:", [x[1][:18] for x in missM[:6]])
print("缺例句音样例:", [x[1][:24] for x in missE[:6]])
if per:
    print("\n有缺失的词表（前10）:")
    for p, a, b, c in per[:10]:
        print(f"   {p:<38} 单词缺{a} 中文缺{b} 例句缺{c}")
