#!/usr/bin/env python3
"""为一篇论文的词表预生成微软神经语音 mp3。
- 单词 / 例句 用英文音色，中文释义用中文音色
- 文件名带音色前缀（w_brian_xxx.mp3），所以可以多音色共存、播放器里随时切换
- 清单 manifest.json 按音色分组，跨论文合并（同音色同内容不重复生成）

用法:
  python3 gen_paper_audio.py vocab-words/GPT2_论文词汇.json listen-audio \
      --en en-US-BrianNeural,en-US-AndrewNeural --zh zh-CN-YunyangNeural,zh-CN-YunjianNeural --rel ../listen-audio
"""
import asyncio, os, sys, json, re, hashlib, edge_tts

args = sys.argv[1:]
def opt(name, default):
    if name in args:
        i = args.index(name); v = args[i + 1]; del args[i:i + 2]; return v
    return default

EN_VOICES = [v.strip() for v in opt("--en", "en-US-BrianNeural").split(",") if v.strip()]
ZH_VOICES = [v.strip() for v in opt("--zh", "zh-CN-YunyangNeural").split(",") if v.strip()]
REL       = opt("--rel", "../listen-audio")
inp, outdir = args[0], args[1]

strip_pos = lambda s: re.sub(r'^[A-Za-z]+\.\s*', '', s or "")
# 去掉括号里带英文的注释（「监督（ supervise learning 监督学习）」→「监督」）
# 否则中文音色会中英混读，听着就像机器音
PAREN = re.compile(r'[（(][^）)]*[A-Za-z][^）)]*[）)]')
clean_zh = lambda s: re.sub(r'\s+', ' ', PAREN.sub('', s or "")).strip()
slug = lambda w: re.sub(r'_+', '_', "".join(c if c.isalnum() else "_" for c in w)).strip("_") or "x"
h12  = lambda s: hashlib.md5(s.encode("utf-8")).hexdigest()[:12]
# en-US-BrianNeural → brian ； zh-CN-YunyangNeural → yunyang
def short(v):
    n = v.split("-")[-1].replace("Neural", "").replace("Multilingual", "ml")
    return n.lower()

data = json.load(open(inp, encoding="utf-8"))
if not isinstance(data, list) or not data or not isinstance(data[0], dict):
    print("跳过（不是章节列表格式）:", os.path.basename(inp)); sys.exit(0)
words = []
for sec in data:
    for it in sec.get("words", []):
        words.append(it)
if not words:
    print("跳过（无词条）:", os.path.basename(inp)); sys.exit(0)

jobs = []
for vid in EN_VOICES:
    s = short(vid)
    for it in words:
        w = (it.get("w") or "").strip()
        if w:
            jobs.append((f"w_{s}_{slug(w)}.mp3", w, vid, "w", w.lower()))
        ex = re.sub(r'\s+', ' ', (it.get("ex") or "").strip())
        if ex:
            jobs.append((f"e_{s}_{h12(ex)}.mp3", ex, vid, "e", ex))
for vid in ZH_VOICES:
    s = short(vid)
    for it in words:
        m = clean_zh(strip_pos(it.get("m", "")))
        if m:
            jobs.append((f"m_{s}_{h12(m)}.mp3", m, vid, "m", m))

os.makedirs(outdir, exist_ok=True)
man_path = os.path.join(outdir, "manifest.json")
man = {}
if os.path.exists(man_path):
    try: man = json.load(open(man_path, encoding="utf-8"))
    except Exception: pass

sem = asyncio.Semaphore(8)
done = fail = skip = 0

async def gen(fn, text, vid, kind, key):
    global done, fail, skip
    path = os.path.join(outdir, fn)
    man.setdefault(vid, {}).setdefault(kind, {})[key] = f"{REL}/{fn}"
    if os.path.exists(path) and os.path.getsize(path) > 800:
        skip += 1; return
    async with sem:
        for i in range(3):
            try:
                await edge_tts.Communicate(text, vid).save(path)
                done += 1; return
            except Exception:
                await asyncio.sleep(1.0 * (i + 1))
    fail += 1
    print("  失败:", vid, text[:24])

async def main():
    print(f"词表 {os.path.basename(inp)}：{len(jobs)} 条（英文 {','.join(EN_VOICES)} / 中文 {','.join(ZH_VOICES)}）")
    await asyncio.gather(*[gen(*j) for j in jobs])
    json.dump(man, open(man_path, "w", encoding="utf-8"), ensure_ascii=False)
    files = [f for f in os.listdir(outdir) if f.endswith(".mp3")]
    total = sum(os.path.getsize(os.path.join(outdir, f)) for f in files)
    print(f"新生成 {done} · 已存在跳过 {skip} · 失败 {fail}")
    print(f"音频目录累计 {len(files)} 个文件，{total/1024/1024:.1f} MB")
    for vid, sets in sorted(man.items()):
        print(f"  {vid}: 单词 {len(sets.get('w',{}))} · 中文 {len(sets.get('m',{}))} · 例句 {len(sets.get('e',{}))}")

asyncio.run(main())
