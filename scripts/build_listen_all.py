#!/usr/bin/env python3
"""生成「联播播放器」页：把全部论文的词表合并进 listen-qq 模板，
顶部加一个选择器（选某篇论文 / 全部单词），选完就地连播。

用法: python3 build_listen_all.py [输出.html]
默认输出: paper-reading/public/study/listen/index.html
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))          # papers/
PAPERS_JSON = os.path.join(HERE, "paper-reading", "data", "papers.json")
WORDS_DIR = os.path.join(HERE, "vocab-words")
MAN = os.path.join(HERE, "listen-audio", "manifest.json")
TPL = os.path.join(HERE, "listen-qq-template.html")
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    HERE, "paper-reading", "public", "study", "listen", "index.html")

LVN = {"4": "四级", "6": "六级", "k": "考研", "p": "考博"}
OVN = {"t": "雅思托福", "g": "GRE"}

def clean_items(data):
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
                "ov":  OVN.get(w.get("ov", ""), ""),
                "sec": s.get("short") or s.get("sec", ""),
            })
    return items

# ---- 1. 读论文清单（顺序 + 分组 + 名称）----
meta = json.load(open(PAPERS_JSON, encoding="utf-8"))
groups = meta["groups"]

items_all = []
optgroups = []          # [(category, [(label, count), ...]), ...]
for g in groups:
    rows = []
    for p in g["papers"]:
        jf = os.path.join(WORDS_DIR, p["slug"] + "_论文词汇.json")
        if not os.path.exists(jf):
            continue
        data = json.load(open(jf, encoding="utf-8"))
        items = clean_items(data)
        if not items:
            continue
        label = "%s (%s)" % (p["name"], p["year"])
        for it in items:
            it["sec"] = label          # 章节 = 论文名，于是「范围」即「论文」
        items_all += items
        rows.append((label, len(items)))
    if rows:
        optgroups.append((g["category"], rows))

n_papers = sum(len(r) for _, r in optgroups)

# ---- 2. 音频清单（全部音色，按需裁剪）----
audio = {}
if os.path.exists(MAN):
    full = json.load(open(MAN, encoding="utf-8"))
    strip_pos = lambda s: re.sub(r'^[A-Za-z]+\.\s*', '', s or '')
    PAREN = re.compile(r'[（(][^）)]*[A-Za-z][^）)]*[）)]')
    clean_zh = lambda s: re.sub(r'\s+', ' ', PAREN.sub('', s or '')).strip()
    need = {
        "w": {(i["w"] or "").lower() for i in items_all},
        "m": {clean_zh(strip_pos(i["m"])) for i in items_all},
        "e": {re.sub(r'\s+', ' ', (i["ex"] or "").strip()) for i in items_all},
    }
    for vid, sets in full.items():
        keep = {k: {kk: vv for kk, vv in kv.items() if kk in need[k]} for k, kv in sets.items()}
        keep = {k: v for k, v in keep.items() if v}
        if keep:
            audio[vid] = keep

# ---- 3. 顶部选择器 HTML（自定义下拉：原生 select 展开会超屏）----
all_label = '▶ 全部单词（%d 篇 · %d 词）' % (n_papers, len(items_all))
rows_html = ['<div class="ppop-item on" data-v="all">%s</div>' % all_label]
for cat, rows in optgroups:
    rows_html.append('<div class="ppop-cat">%s</div>' % cat)
    for label, n in rows:
        rows_html.append('<div class="ppop-item" data-v="%s">%s · %d 词</div>' % (label, label, n))
select_html = (
    '\n  <div class="pbar">\n'
    '    <button id="paperBtn" class="pbtn" type="button">\n'
    '      <span id="paperLabel">' + all_label + '</span>\n'
    '      <svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"'
    ' stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>\n'
    '    </button>\n'
    '    <div id="paperPop" class="ppop"><div class="ppop-in">\n      '
    + "\n      ".join(rows_html)
    + '\n    </div></div>\n  </div>\n'
)

# ---- 4. 注入模板 ----
tpl = open(TPL, encoding="utf-8").read()

CSS = """
/* ===== 联播选择器（自定义下拉，面板内部滚动，绝不超屏）===== */
.pbar{position:relative;padding:8px 20px 0;display:flex;justify-content:center;z-index:20}
.pbtn{display:inline-flex;align-items:center;gap:8px;font:inherit;font-size:13px;font-weight:600;
  padding:7px 14px;border-radius:10px;border:1px solid rgba(0,0,0,.16);background:rgba(255,255,255,.92);
  color:inherit;cursor:pointer;max-width:min(90vw,440px)}
.pbtn span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pbtn .caret{width:14px;height:14px;flex:none;opacity:.65;transition:transform .18s}
.pbtn.on .caret{transform:rotate(180deg)}
.ppop{position:fixed;display:none;z-index:90}
.ppop.on{display:block}
.ppop-in{max-height:min(62vh,440px);overflow:auto;-webkit-overflow-scrolling:touch;
  background:#fff;border:1px solid rgba(0,0,0,.12);border-radius:12px;
  box-shadow:0 14px 36px rgba(0,0,0,.22);padding:6px}
.ppop-cat{position:sticky;top:0;background:#fff;padding:9px 10px 5px;font-size:11px;font-weight:700;
  letter-spacing:.4px;color:#9a8f7d}
.ppop-item{padding:7px 10px;border-radius:8px;font-size:13px;line-height:1.35;cursor:pointer;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#2a2a2a}
.ppop-item:hover{background:rgba(0,0,0,.06)}
.ppop-item.on{background:#b35400;color:#fff}
"""

WIRE = """
/* ===== 联播选择器：选「某篇」或「全部」，就地重排队列并开始播放 ===== */
(function(){
  var btn=document.getElementById('paperBtn'), pop=document.getElementById('paperPop'),
      lab=document.getElementById('paperLabel');
  if(!btn||!pop)return;
  var inner=pop.querySelector('.ppop-in');
  function close(){pop.classList.remove('on');btn.classList.remove('on')}
  function place(){
    var r=btn.getBoundingClientRect();
    var w=Math.min(window.innerWidth*0.92,440);
    pop.style.width=w+'px';
    var left=Math.max(8,Math.min(r.left+r.width/2-w/2,window.innerWidth-w-8));
    pop.style.left=left+'px';
    var below=window.innerHeight-r.bottom-16;
    if(below<220&&r.top>below){ pop.style.top='auto'; pop.style.bottom=(window.innerHeight-r.top+6)+'px' }
    else { pop.style.bottom='auto'; pop.style.top=(r.bottom+6)+'px' }
  }
  function apply(v){
    SECS.forEach(function(s){range[s]=(v==='all')||(s===v)});
    try{localStorage.setItem('listen_qq_range',JSON.stringify(range))}catch(e){}
    try{renderRange()}catch(e){}
    qi=0; buildQueue();
    if(!queue.length){ if(typeof emptyHint==='function')emptyHint(); return }
    setPlaying(true); playCurrent();
  }
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    var open=!pop.classList.contains('on');
    close();
    if(open){ place(); pop.classList.add('on'); btn.classList.add('on'); }
  });
  document.addEventListener('click',function(){close()});
  window.addEventListener('resize',function(){if(pop.classList.contains('on'))place()});
  window.addEventListener('scroll',function(){if(pop.classList.contains('on'))place()},true);
  pop.addEventListener('click',function(e){
    e.stopPropagation();
    var it=e.target&&e.target.closest?e.target.closest('.ppop-item'):null;
    if(!it)return;
    lab.textContent=it.textContent;
    var all=pop.querySelectorAll('.ppop-item');
    for(var i=0;i<all.length;i++)all[i].classList.toggle('on',all[i]===it);
    close();
    apply(it.getAttribute('data-v'));
  });
})();
"""

html = (tpl.replace("__DATA__", json.dumps(items_all, ensure_ascii=False))
           .replace("__AUDIO__", json.dumps(audio, ensure_ascii=False))
           .replace("__TITLE__", "全部单词 · 联播")
           .replace("__PAPER__", "单词联播"))

# 选择器插在 .main 之前
html = html.replace('  <div class="main">', select_html + '  <div class="main">', 1)
# CSS 插在 </style> 之前
html = html.replace("</style>", CSS + "</style>", 1)
# 接线脚本插在最后一个 </script> 之前
idx = html.rfind("</script>")
html = html[:idx] + WIRE + html[idx:]

open(OUT, "w", encoding="utf-8").write(html)
print("OK:", OUT)
print("  论文 %d 篇 · 词条 %d · 页面 %.2f MB · 音色 %d"
      % (n_papers, len(items_all), len(html) / 1024 / 1024, len(audio)))
