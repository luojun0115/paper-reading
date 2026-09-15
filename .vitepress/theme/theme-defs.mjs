/**
 * 深读馆 DeepRead · 主题数据（唯一真源）
 * 纯 ESM，Node 脚本可直接读取以生成 CSS；Vite/Vue 侧由 themes.ts 包装。
 * 改这里 → 跑 `node scripts/gen-theme-css.mjs` → 全站生效。
 */
export const THEMES = [
  {
    key: 'paper', name: '纸墨书房', en: 'PAPER STUDY', dark: false, shortcut: '1',
    chips: ['#faf8f4', '#b35400', '#1f6f5c', '#e9e0d2', '#241f1a'],
    vars: {
      bg: '#faf8f4', bg2: '#f4eee5', panel: '#ffffff', ink: '#241f1a', ink2: '#6d6357',
      line: '#e9e0d2', accent: '#b35400', asoft: '#fdf3e7', accent2: '#1f6f5c', on: '#ffffff',
      hf: '"Songti SC","Source Han Serif SC",Georgia,serif', hlet: '0.2px',
      r: '12px', bw: '1px', tex: 'none', tsize: '26px 26px',
      glow: '0 1px 2px rgba(80,60,30,.05)',
      hrule: '0px', hrulem: '0px'
    }
  },
  {
    key: 'newsprint', name: '舊報铅字', en: 'NEWSPRINT', dark: false, shortcut: '2',
    chips: ['#f5f1e6', '#a5271d', '#2f4858', '#d8cfb8', '#16150f'],
    vars: {
      bg: '#f5f1e6', bg2: '#ece6d6', panel: '#fffdf6', ink: '#16150f', ink2: '#6a6455',
      line: '#d8cfb8', accent: '#a5271d', asoft: '#f7e7e2', accent2: '#2f4858', on: '#ffffff',
      hf: '"Songti SC","Source Han Serif SC",Georgia,serif', hlet: '0',
      r: '2px', bw: '1.5px',
      tex: 'repeating-linear-gradient(rgba(90,80,55,.045) 0 1px, transparent 1px 7px)',
      tsize: 'auto', glow: 'none',
      hrule: '0px', hrulem: '0px'
    }
  },
  {
    key: 'coral', name: '珊瑚奶油', en: 'CORAL CREAM', dark: false, shortcut: '3',
    chips: ['#fff8f4', '#e85f42', '#2a9d8f', '#f6e0d4', '#2c1f19'],
    vars: {
      bg: '#fff8f4', bg2: '#ffefe7', panel: '#ffffff', ink: '#2c1f19', ink2: '#8d7266',
      line: '#f6e0d4', accent: '#e85f42', asoft: '#ffe9e2', accent2: '#2a9d8f', on: '#ffffff',
      hf: '"Yuanti SC","PingFang SC",-apple-system,sans-serif', hlet: '-0.2px',
      r: '18px', bw: '1px',
      tex: 'radial-gradient(rgba(232,95,66,.13) 1.2px, transparent 1.3px)',
      tsize: '15px 15px', glow: '0 2px 9px rgba(232,95,66,.10)',
      hrule: '0px', hrulem: '0px'
    }
  },
  {
    key: 'matcha', name: '抹茶纸笺', en: 'MATCHA NOTE', dark: false, shortcut: '4',
    chips: ['#f4f7ef', '#4f7d3a', '#b8860b', '#dde6d2', '#1e2a19'],
    vars: {
      bg: '#f4f7ef', bg2: '#e9f0e0', panel: '#ffffff', ink: '#1e2a19', ink2: '#67735d',
      line: '#dde6d2', accent: '#4f7d3a', asoft: '#ecf4e4', accent2: '#b8860b', on: '#ffffff',
      hf: '"Songti SC","Source Han Serif SC",Georgia,serif', hlet: '0.3px',
      r: '14px', bw: '1px',
      tex: 'repeating-linear-gradient(transparent 0 25px, rgba(79,125,58,.085) 25px 26px)',
      tsize: 'auto', glow: '0 1px 3px rgba(60,90,50,.06)',
      hrule: '0px', hrulem: '0px'
    }
  },
  {
    key: 'indigo', name: '靛蓝学报', en: 'ACADEMIC INDIGO', dark: false, shortcut: '5',
    chips: ['#f6f8fc', '#2c4f9e', '#0e7490', '#dde5f2', '#111a2e'],
    vars: {
      bg: '#f6f8fc', bg2: '#eaf0fa', panel: '#ffffff', ink: '#111a2e', ink2: '#5a6b86',
      line: '#dde5f2', accent: '#2c4f9e', asoft: '#eef2fd', accent2: '#0e7490', on: '#ffffff',
      hf: '"PingFang SC",-apple-system,sans-serif', hlet: '-0.4px',
      r: '6px', bw: '1px',
      tex: 'linear-gradient(rgba(44,79,158,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(44,79,158,.055) 1px, transparent 1px)',
      tsize: '26px 26px', glow: '0 1px 3px rgba(20,40,90,.07)',
      hrule: '0px', hrulem: '0px'
    }
  },
  {
    key: 'lavender', name: '薰衣草夜读', en: 'LAVENDER DUSK', dark: false, shortcut: '6',
    chips: ['#f8f6fd', '#6d5ae0', '#c2410c', '#e7e1f5', '#221c33'],
    vars: {
      bg: '#f8f6fd', bg2: '#efeafa', panel: '#ffffff', ink: '#221c33', ink2: '#6f6689',
      line: '#e7e1f5', accent: '#6d5ae0', asoft: '#f0ecfd', accent2: '#c2410c', on: '#ffffff',
      hf: '"PingFang SC",-apple-system,sans-serif', hlet: '-0.3px',
      r: '16px', bw: '1px',
      tex: 'radial-gradient(900px 300px at 50% -90px, rgba(109,90,224,.15), transparent 70%)',
      tsize: 'auto', glow: '0 2px 10px rgba(109,90,224,.09)',
      hrule: '0px', hrulem: '0px'
    }
  },
  {
    key: 'lab', name: '暗夜工坊', en: 'DARK LAB', dark: true, shortcut: '7',
    chips: ['#0d1117', '#34d399', '#60a5fa', '#232c38', '#e6edf3'],
    vars: {
      bg: '#0d1117', bg2: '#12181f', panel: '#161d26', ink: '#e6edf3', ink2: '#8b949e',
      line: '#232c38', accent: '#34d399', asoft: '#10241d', accent2: '#60a5fa', on: '#06231a',
      hf: '"SF Mono",Menlo,monospace', hlet: '-0.2px',
      r: '6px', bw: '1px', tex: 'none', tsize: 'auto', glow: '0 1px 3px rgba(0,0,0,.45)',
      hrule: '0px', hrulem: '0px'
    }
  },
  {
    key: 'inknight', name: '深墨蓝夜', en: 'INK NIGHT', dark: true, shortcut: '8',
    chips: ['#0f1620', '#f2b705', '#38bdf8', '#24313f', '#e8eef7'],
    vars: {
      bg: '#0f1620', bg2: '#141d29', panel: '#18222f', ink: '#e8eef7', ink2: '#93a3b8',
      line: '#24313f', accent: '#f2b705', asoft: '#2b2411', accent2: '#38bdf8', on: '#2b1d00',
      hf: '"PingFang SC",-apple-system,sans-serif', hlet: '-0.3px',
      r: '10px', bw: '1px',
      tex: 'radial-gradient(820px 260px at 22% -70px, rgba(242,183,5,.12), transparent 70%)',
      tsize: 'auto', glow: '0 2px 9px rgba(0,0,0,.42)',
      hrule: '0px', hrulem: '0px'
    }
  },
  {
    key: 'neon', name: '赛博霓虹', en: 'CYBER NEON', dark: true, shortcut: '9',
    chips: ['#090c14', '#ff3d8b', '#22d3ee', '#1f2942', '#eaeefb'],
    vars: {
      bg: '#090c14', bg2: '#0f1522', panel: '#131a29', ink: '#eaeefb', ink2: '#8b96b5',
      line: '#1f2942', accent: '#ff3d8b', asoft: '#2a0f20', accent2: '#22d3ee', on: '#1a0210',
      hf: '"SF Mono",Menlo,monospace', hlet: '-0.2px',
      r: '12px', bw: '1px',
      tex: 'linear-gradient(rgba(34,211,238,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,61,139,.055) 1px, transparent 1px)',
      tsize: '28px 28px',
      glow: '0 0 0 1px rgba(255,61,139,.10), 0 6px 20px rgba(255,61,139,.12)',
      hrule: '0px', hrulem: '0px'
    }
  },
  {
    key: 'magazine', name: '杂志内页', en: 'EDITORIAL', dark: false, shortcut: '0',
    chips: ['#fcfcfc', '#e5006d', '#141414', '#c9c9c9', '#0a0a0a'],
    vars: {
      bg: '#fcfcfc', bg2: '#f4f4f5', panel: '#ffffff', ink: '#0a0a0a', ink2: '#767676',
      line: '#e4e4e4', accent: '#e5006d', asoft: '#fdeef4', accent2: '#141414', on: '#ffffff',
      hf: '"Baskerville","Hoefler Text",Georgia,"PingFang SC",-apple-system,sans-serif', hlet: '-0.4px',
      r: '0px', bw: '1px', tex: 'none', tsize: 'auto', glow: 'none',
      hrule: '4px', hrulem: '20px'
    }
  }
]

export const DEFAULT_THEME = 'matcha'
export const STORAGE_KEY = 'deepread:theme'
