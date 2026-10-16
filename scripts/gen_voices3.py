#!/usr/bin/env python3
# 1) 补齐全部微软英语音色样本（美音17 + 英音5）
# 2) 实测「预生成单词音频」的体积成本
import asyncio, os, json, glob, edge_tts

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "temp", "edge-voices")
os.makedirs(OUT, exist_ok=True)

TXT_ZH = "监督学习。以条件概率建模，效果明确。"
TXT_EN = "Language models are unsupervised multitask learners."

EN_ALL = [
    "en-US-AriaNeural", "en-US-JennyNeural", "en-US-AvaNeural", "en-US-EmmaNeural",
    "en-US-MichelleNeural", "en-US-AnaNeural", "en-US-GuyNeural", "en-US-AndrewNeural",
    "en-US-BrianNeural", "en-US-ChristopherNeural", "en-US-EricNeural", "en-US-RogerNeural",
    "en-US-SteffanNeural", "en-US-AndrewMultilingualNeural", "en-US-BrianMultilingualNeural",
    "en-US-AvaMultilingualNeural", "en-US-EmmaMultilingualNeural",
    "en-GB-SoniaNeural", "en-GB-RyanNeural", "en-GB-LibbyNeural", "en-GB-ThomasNeural",
    "en-GB-MaisieNeural",
]
ZH_ALL = ["zh-CN-XiaoxiaoNeural", "zh-CN-XiaoyiNeural", "zh-CN-YunxiNeural",
          "zh-CN-YunjianNeural", "zh-CN-YunyangNeural", "zh-CN-YunxiaNeural",
          "zh-CN-liaoning-XiaobeiNeural", "zh-CN-shaanxi-XiaoniNeural"]

sem = asyncio.Semaphore(4)

async def synth(vid, tag, text, folder=None):
    path = os.path.join(folder or OUT, f"{vid}_{tag}.mp3")
    if os.path.exists(path) and os.path.getsize(path) > 1200:
        return True
    async with sem:
        for i in range(3):
            try:
                await edge_tts.Communicate(text, vid).save(path)
                return True
            except Exception:
                await asyncio.sleep(1.0 * (i + 1))
        return False

async def main():
    vs = await edge_tts.list_voices()
    have = {v["ShortName"] for v in vs}
    en = [v for v in EN_ALL if v in have]
    zh = [v for v in ZH_ALL if v in have]
    print("英语音色:", len(en), " 中文音色:", len(zh))

    tasks = []
    for v in en:
        tasks.append(synth(v, "en", TXT_EN))
        tasks.append(synth(v, "zh", TXT_ZH))
    for v in zh:
        tasks += [synth(v, "zh", TXT_ZH), synth(v, "en", TXT_EN)]
    await asyncio.gather(*tasks)

    # --- 体积实测：拿 GPT2 的 120 个词，用 Brian 预生成 ---
    words = []
    for f in glob.glob(os.path.join(BASE, "public", "study", "vocab-words", "*GPT2*.json")):
        data = json.load(open(f, encoding="utf-8"))
        items = data if isinstance(data, list) else data.get("words", [])
        for it in items:
            w = it.get("w") or it.get("word")
            if w: words.append(w)
    words = words[:120]
    tmp = os.path.join(BASE, "temp", "edge-voices", "_costtest")
    os.makedirs(tmp, exist_ok=True)
    await asyncio.gather(*[synth("en-US-BrianNeural", "w", w, tmp) for w in words])
    files = [p for p in glob.glob(os.path.join(tmp, "*.mp3"))]
    total = sum(os.path.getsize(p) for p in files)
    if files:
        avg = total / len(files)
        print(f"\n体积实测（{len(files)} 个单词音频）: 合计 {total/1024:.0f} KB，平均 {avg/1024:.1f} KB/词")
        print(f"  单篇 276 词 ≈ {avg*276/1024/1024:.1f} MB")
        print(f"  99 篇 27324 词（按词去重后一般 1.2~1.5 万）≈ {avg*27324/1024/1024:.0f} MB，去重后 ≈ {avg*13500/1024/1024:.0f} MB")
        print(f"  再加中文释义同量级 → 上述数字 ×2")
    for p in files:
        os.remove(p)
    os.rmdir(tmp)
    print("\n试听样本:", len([f for f in os.listdir(OUT) if f.endswith('.mp3')]), "个")

asyncio.run(main())
