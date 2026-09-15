/* @ts-ignore - 由 scripts/extract-manifest 生成的清单 */
import raw from '../../data/papers.json'

export interface Paper {
  slug: string
  name: string
  year: string
  title: string
  listen: boolean
  category: string
}

interface RawGroup { category: string; papers: Omit<Paper, 'category'>[] }
interface RawData { site: { vocabCount: number; categories: number }; groups: RawGroup[] }

const data = raw as unknown as RawData

export const GROUPS: RawGroup[] = data.groups

export const PAPERS: Paper[] = data.groups.flatMap(g =>
  g.papers.map(p => ({ ...p, category: g.category }))
)

export const STATS = {
  papers: PAPERS.length,
  categories: data.groups.length,
  vocabPages: PAPERS.length,
  listenPages: PAPERS.filter(p => p.listen).length
}

/** 学习页 URL（静态页放在 public/study 下，保留原页全部交互） */
export const vocabUrl = (slug: string) => `/study/vocab/${slug}_论文词汇.html`
export const listenUrl = (slug: string) => `/study/listen/${slug}_听力.html`

export const INDEX_PAGES = [
  { name: '按研究方向', href: '/study/vocab/index.html' },
  { name: '按名称', href: '/study/vocab/index_按名称.html' },
  { name: '按时间', href: '/study/vocab/index_按时间.html' },
  { name: '按全称', href: '/study/vocab/index_按全称.html' }
]
