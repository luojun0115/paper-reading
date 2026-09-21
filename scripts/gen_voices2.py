#!/usr/bin/env python3
# 批量生成微软 Edge(Azure) 神经语音试听样本：中文音色 + 英文音色，各一条中文、一条英文
import asyncio, os, json, edge_tts

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "temp", "edge-voices")
os.makedirs(OUT, exist_ok=True)

TXT_ZH = "监督学习。以条件概率建模，效果明确。"
TXT_EN = "Language models are unsupervised multitask learners."

# 中文音色（微软同时提供 6 个 zh-CN 神经音色；方言音色也带上）
ZH_PICK = ["zh-CN-XiaoxiaoNeural", "zh-CN-XiaoyiNeural", "zh-CN-YunxiNeural",
           "zh-CN-YunjianNeural", "zh-CN-YunyangNeural", "zh-CN-YunxiaNeural",
           "zh-CN-liaoning-XiaobeiNeural", "zh-CN-shaanxi-XiaoniNeural"]
# 英文音色（美音 + 英音，挑常用的）
EN_PICK = ["en-US-AriaNeural", "en-US-JennyNeural", "en-US-AvaNeural",
           "en-US-GuyNeural", "en-US-AndrewNeural", "en-US-BrianNeural",
           "en-GB-SoniaNeural", "en-GB-RyanNeural"]

sem = asyncio.Semaphore(3)

async def synth(vid, tag, text):
    path = os.path.join(OUT, f"{vid}_{tag}.mp3")
    if os.path.exists(path) and os.path.getsize(path) > 1200:
        return True
    async with sem:
        for i in range(3):
            try:
                await edge_tts.Communicate(text, vid).save(path)
                return True
            except Exception as e:
                await asyncio.sleep(1.2 * (i + 1))
        return False

async def main():
    voices = await edge_tts.list_voices()
    have = {v["ShortName"] for v in voices}
    zh = [v for v in ZH_PICK if v in have]
    en = [v for v in EN_PICK if v in have]
    print("中文音色可用:", len(zh), zh)
    print("英文音色可用:", len(en), en)

    tasks = []
    for v in zh:
        tasks.append(synth(v, "zh", TXT_ZH))
        tasks.append(synth(v, "en", TXT_EN))
    for v in en:
        tasks.append(synth(v, "en", TXT_EN))
        tasks.append(synth(v, "zh", TXT_ZH))
    res = await asyncio.gather(*tasks)

    ok = {}
    for kind, lst in (("zh", zh), ("en", en)):
        for v in lst:
            got = []
            for tag in ("zh", "en"):
                p = os.path.join(OUT, f"{v}_{tag}.mp3")
                if os.path.exists(p) and os.path.getsize(p) > 1200:
                    got.append(tag)
            if got:
                ok[v] = got
    json.dump(ok, open(os.path.join(OUT, "manifest.json"), "w"), ensure_ascii=False, indent=1)
    print("\n成功音色数:", len(ok))
    for v, g in ok.items():
        print(f"  {v}: {','.join(g)}")

asyncio.run(main())
