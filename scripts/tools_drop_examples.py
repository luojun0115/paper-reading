#!/usr/bin/env python3
"""把例句音频挪出活跃目录（保留备份，方便反悔），并从清单里去掉 e 段。
用法: python3 tools_drop_examples.py        移出
      python3 tools_drop_examples.py --restore   还原
"""
import os, sys, json, shutil, glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AU = os.path.join(BASE, "listen-audio")
BK = os.path.join(BASE, "listen-audio_examples_backup")
mp = os.path.join(AU, "manifest.json")
restore = "--restore" in sys.argv

os.makedirs(BK, exist_ok=True)
if restore:
    n = 0
    for f in glob.glob(os.path.join(BK, "*.mp3")):
        shutil.move(f, os.path.join(AU, os.path.basename(f)))
        n += 1
    print(f"已还原例句音频 {n} 个")

if not restore:
    n = 0
    for f in glob.glob(os.path.join(AU, "e_*.mp3")):
        shutil.move(f, os.path.join(BK, os.path.basename(f)))
        n += 1
    print(f"已移出例句音频 {n} 个 → {BK}")

    man = json.load(open(mp, encoding="utf-8"))
    removed = 0
    for vid, sets in man.items():
        if "e" in sets:
            removed += len(sets["e"])
            del sets["e"]
    json.dump(man, open(mp, "w", encoding="utf-8"), ensure_ascii=False)
    print(f"清单已移除例句条目 {removed} 条")
else:
    # 还原时把清单里的例句段补回来（扫描备份文件名重建需要原文，这里只提示要重跑生成）
    print("提示：清单里的例句条目需重新生成/重新扫描才会恢复（音频文件已就位，重跑生成脚本会自动跳过已存在文件并登记清单）")

files = [f for f in os.listdir(AU) if f.endswith(".mp3")]
size = sum(os.path.getsize(os.path.join(AU, f)) for f in files)
print(f"活跃音频目录：{len(files)} 个文件 {size/1024/1024:.1f} MB")
if os.path.isdir(BK):
    bks = [f for f in os.listdir(BK) if f.endswith(".mp3")]
    bsize = sum(os.path.getsize(os.path.join(BK, f)) for f in bks)
    print(f"例句备份目录：{len(bks)} 个文件 {bsize/1024/1024:.1f} MB")
