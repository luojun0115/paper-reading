#!/usr/bin/env python3
"""把 words.json 注入 listen-qq-template.html，产出新版视觉的单词连播页（原型）。

用法: python3 build_listen_qq.py words.json 输出.html "论文名 · 简称 · 会议, 年份"
"""
import json, sys, os, re

args = sys.argv[1:]
title = None
if "--title" in args:
    i = args.index("--title"); title = args[i + 1]; del args[i:i + 2]
inp, out = args[0], args[1]
paper = args[2] if len(args) > 2 else ""
title = title or os.path.basename(out).rsplit(".", 1)[0]

LVN = {"4": "四级", "6": "六级", "k": "考研", "p": "考博"}
OVN = {"t": "雅思托福", "g": "GRE"}      # 老版的额外标签
data = json.load(open(inp, encoding="utf-8"))

items = []
for s in data:
    for w in s.get("words", []):
        items.append({
            "w":  w.get("w", ""),
            "ipa": w.get("ipa", ""),
            "pos": w.get("pos", ""),
            "m":   w.get("m", ""),
            "ex":  w.get("ex", ""),
            "lv":  LVN.get(w.get("lv", ""), ""),
            "ov":  OVN.get(w.get("ov", ""), ""),      # 雅思托福 / GRE（老版也有的标签）
            "sec": s.get("short") or s.get("sec", ""),
        })

tpl_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "listen-qq-template.html")
tpl = open(tpl_path, encoding="utf-8").read()

# 预生成的微软语音清单（只注入本篇用得到的条目，保持 HTML 精简）
man_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "study", "listen-audio", "manifest.json")
audio = {}      # 按音色分组: {voiceId: {w:{}, m:{}, e:{}}}
if os.path.exists(man_path):
    try:
        full = json.load(open(man_path, encoding="utf-8"))
        strip_pos = lambda s: re.sub(r'^[A-Za-z]+\.\s*', '', s or '')
        PAREN = re.compile(r'[（(][^）)]*[A-Za-z][^）)]*[）)]')
        clean_zh = lambda s: re.sub(r'\s+', ' ', PAREN.sub('', s or '')).strip()
        need_w = {(i["w"] or "").lower() for i in items}
        need_m = {clean_zh(strip_pos(i["m"])) for i in items}
        need_e = {re.sub(r'\s+', ' ', (i["ex"] or "").strip()) for i in items}
        need = {"w": need_w, "m": need_m, "e": need_e}
        for vid, sets in full.items():
            keep = {}
            for kind, kv in sets.items():
                sel = {k: v for k, v in kv.items() if k in need[kind]}
                if sel:
                    keep[kind] = sel
            if keep:
                audio[vid] = keep
    except Exception as e:
        print("音频清单读取失败（将回退在线 TTS）:", e)

html = (tpl.replace("__DATA__", json.dumps(items, ensure_ascii=False))
           .replace("__AUDIO__", json.dumps(audio, ensure_ascii=False))
           .replace("__TITLE__", title)
           .replace("__PAPER__", paper))
open(out, "w", encoding="utf-8").write(html)
if audio:
    print("OK:", out, len(items), "words", "| 本地音色:",
          ", ".join(f"{v}(单词{len(s.get('w',{}))}/中文{len(s.get('m',{}))}/例句{len(s.get('e',{}))})"
                    for v, s in audio.items()))
else:
    print("OK:", out, len(items), "words", "| 无本地语音（走在线 TTS）")
