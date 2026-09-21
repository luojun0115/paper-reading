# 单词级别参照库（wordlists）

用于校验 `papers/vocab/` 词表中词条级别标注（4/6/考研/考博 + ov 标签 t/g）的权威词表。
每行一个词，小写、去重、按字母排序，可直接用于集合比对。

## 词表清单

| 文件 | 级别 | 词数 | 来源 |
|---|---|---|---|
| `CET4.txt` | 四级 | 4544 | kajweb/dict 四级词汇书（3 册合并） |
| `CET6.txt` | 六级 | 3991 | kajweb/dict 六级词汇书（3 册合并） |
| `KaoYan.txt` | 考研 | 5044 | kajweb/dict 考研词汇书（3 册合并） |
| `TEM4.txt` | 专四 | 4340 | kajweb/dict Level4 专四词汇书（2 册合并） |
| `TEM8.txt` | 专八 | 12410 | kajweb/dict Level8 专八词汇书（2 册合并） |
| `TOEFL.txt` | 托福 | 10366 | kajweb/dict 托福词汇书（2 册合并） |
| `GRE.txt` | GRE | 9982 | kajweb/dict GRE 词汇书（2 册合并） |
| `IELTS.txt` | 雅思 | 5274 | kajweb/dict 雅思词汇书（2 册合并） |
| `KaoBo.txt` | 考博 | 6910 | LinXueyuanStdio/DictionaryData《考博英语》 |

## 参照版（另一来源，交叉验证用）

| 文件 | 词数 | 来源 |
|---|---|---|
| `CET4_参照_mahavivo.txt` | — | mahavivo/english-wordlists 四级表 |
| `CET6_参照_mahavivo.txt` | — | mahavivo/english-wordlists 六级表 |
| `TOEFL_参照_mahavivo.txt` | — | mahavivo/english-wordlists 托福表 |
| `GRE_参照_红宝书8000.txt` | — | mahavivo/english-wordlists GRE 红宝书 8000 |
| `专四专八_参照_mahavivo.txt` | — | mahavivo/english-wordlists 专业四八级合表 |

## 用法示例

```bash
# 校验 papers/vocab 某词表里标为四级的词是否在权威四级表内
comm -12 <(sort CET4.txt) <(node -e '...提取DATA中lv=4的词...' | sort)
```

原始数据（zip/json/csv）保留在 `raw/` 子目录，可复现。
