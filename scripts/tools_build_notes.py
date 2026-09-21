#!/usr/bin/env python3
"""确保 paper-reading/paper-notes/<slug>.md（你自己写的笔记）存在。

- 笔记由 VitePress 直接构建成 /paper-notes/<slug>.html，无需本脚本生成 HTML。
- 缺失或仍是占位 stub → 生成/重建 stub 供你填写；你已改过的内容不会被覆盖。
用法: python3 tools_build_notes.py
"""
import os, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
papers = json.load(open(os.path.join(BASE, "paper-reading", "data", "papers.json"), encoding="utf-8"))
SRC = os.path.join(BASE, "paper-reading", "paper-notes")
os.makedirs(SRC, exist_ok=True)

PLACEHOLDER = "（待补充）"

TEMPLATE = (
    "---\n"
    "title: {name} ({year}) · 笔记区\n"
    "aside: false\n"
    "pageClass: wide\n"
    "editLink: false\n"
    "---\n\n"
    "# {name} ({year}) · 笔记区\n\n"
    "> 这一页由你自己填写。编辑源文件 `paper-reading/paper-notes/{slug}.md`，"
    "重新生成网站（运行 `npm run build`）后这里就会更新。\n\n"
    "{placeholder}\n\n"
    "---\n\n"
    "[← 返回讲解区](/explain/)\n"
)

made = skipped = 0
for g in papers["groups"]:
    for p in g["papers"]:
        slug, name, year = p["slug"], p["name"], p["year"]
        md_path = os.path.join(SRC, f"{slug}.md")
        # 缺失或仍是占位 stub → 生成/重建；已填写的内容不会被覆盖
        if not os.path.exists(md_path) or PLACEHOLDER in open(md_path, encoding="utf-8").read():
            open(md_path, "w", encoding="utf-8").write(
                TEMPLATE.format(name=name, year=year, slug=slug, placeholder=PLACEHOLDER)
            )
            made += 1
        else:
            skipped += 1
print(f"笔记源文件(paper-reading/paper-notes): 新建/重建 stub {made} 个 · 保留已填 {skipped} 个")
