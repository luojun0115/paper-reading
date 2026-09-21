import os, asyncio, edge_tts

out_dir = "/Users/milong/Desktop/code/zcode-test/papers/edge-voices"
os.makedirs(out_dir, exist_ok=True)

text = "欢迎使用深读馆。下面用微软 Edge 同款神经网络声音，为你朗读这篇论文。"

voices = {
    "yunxi":   "zh-CN-YunxiNeural",    # 云希（男）
    "xiaoxiao":"zh-CN-XiaoxiaoNeural", # 晓晓（女）
    "xiaorui": "zh-CN-XiaoruiNeural",  # 晓睿（男）
    "yunyang": "zh-CN-YunyangNeural",  # 云扬（男）
}

async def synth(name, vid):
    for attempt in range(3):
        try:
            c = edge_tts.Communicate(text, vid)
            await c.save(os.path.join(out_dir, name + ".mp3"))
            print("saved", name, vid)
            return
        except Exception as e:
            print(f"retry {name} ({attempt+1}): {e}")
    print("FAILED", name, vid)

async def main():
    import asyncio as _a
    await _a.gather(*(synth(n, v) for n, v in voices.items()))

asyncio.run(main())
