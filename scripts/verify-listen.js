let pw; try{ pw=require('playwright'); }catch(e){ pw=require('playwright-core'); }
const FILE='file://'+require('path').resolve(__dirname,'..')+'/public/study/listen/GPT2_%E5%90%AC%E5%8A%9B.html';

(async()=>{
  const b=await pw.chromium.launch();
  const p=await b.newPage({viewport:{width:1280,height:900}});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  const clog=[]; p.on('console',m=>{ if(m.type()==='error')clog.push(m.text()) });
  await p.goto(FILE);
  await p.waitForTimeout(1000);

  const R=[];
  const add=(n,ok,info)=>R.push({n,ok:!!ok,info:info===undefined?'':String(info)});
  const ev=fn=>p.evaluate(fn);
  const clickSel=async(sel,text)=>{
    await p.evaluate(([s,t])=>{
      const el=document.querySelector(s);
      if(!el)throw new Error('no '+s);
      el.click();
    },[sel,text||'']);
    await p.waitForTimeout(160);
  };
  const clickByText=(sel,text)=>p.evaluate(([s,t])=>{
    const el=[...document.querySelectorAll(s+' b')].find(x=>x.textContent.trim()===t);
    if(!el)throw new Error('no option '+t+' in '+s);
    el.click();
  },[sel,text]);

  // ---------- 初始 ----------
  const s0=await ev(()=>({
    skin:document.getElementById('app').dataset.skin,
    word:document.getElementById('wbig').textContent,
    ipa:document.getElementById('wipa').textContent,
    sec:document.getElementById('wsec').textContent,
    queue:queue.length, total:ITEMS.length,
    rep:S.repeat, font:S.font, reveal:S.reveal, voice:S.voice, pause:S.pause, order:S.order, skipOn:S.skipOn
  }));
  add('初始渲染(单词+斜线音标+角标)', s0.word && s0.ipa.startsWith('/') && s0.ipa.endsWith('/') && /第 /.test(s0.sec), JSON.stringify(s0));

  // ---------- 打开设置 ----------
  await clickSel('#moreBtn');
  add('⋯ 打开设置面板', await ev(()=>document.getElementById('sheet').classList.contains('on')));

  // ---------- 皮肤循环 ----------
  const k0=await ev(()=>document.getElementById('app').dataset.skin);
  await clickSel('#skinBtn');
  const k1=await ev(()=>document.getElementById('app').dataset.skin);
  add('👕 皮肤循环', k0!==k1, k0+' -> '+k1);

  // ---------- 字体 ----------
  await clickByText('#segFont','宋体');
  const f=await ev(()=>({S:S.font,css:getComputedStyle(document.getElementById('wbig')).fontFamily}));
  add('字体=宋体（单词已应用）', f.S==='serif' && /Songti|SimSun|Georgia/i.test(f.css), f.css);

  // ---------- 重复次数 ----------
  await clickByText('#segRepeat','3次');
  const r1=await ev(()=>({S:S.repeat,input:document.getElementById('repInput').value}));
  add('重复=3次（按钮同步输入框）', r1.S===3 && r1.input==='3', JSON.stringify(r1));
  await p.evaluate(()=>{const i=document.getElementById('repInput');i.value=7;i.dispatchEvent(new Event('change'))});
  await p.waitForTimeout(160);
  const r2=await ev(()=>({S:S.repeat,input:document.getElementById('repInput').value,on:[...document.querySelectorAll('#segRepeat b')].filter(x=>x.classList.contains('on')).length}));
  add('重复自定义=7（取消快捷高亮）', r2.S===7 && r2.input==='7' && r2.on===0, JSON.stringify(r2));

  // ---------- 先听后现 ----------
  await clickByText('#segReveal','关');
  const rv=await ev(()=>({S:S.reveal,wav:getComputedStyle(document.getElementById('wav')).display,txt:getComputedStyle(document.getElementById('wtxt')).display}));
  add('先听后现=关（波浪隐藏/文字显示）', rv.S===false && rv.wav==='none' && rv.txt!=='none', JSON.stringify(rv));
  await clickByText('#segReveal','开');
  const rv2=await ev(()=>({S:S.reveal,op:getComputedStyle(document.getElementById('art')).opacity}));
  add('先听后现=开（配置已存）', rv2.S===true, JSON.stringify(rv2));

  // ---------- 发音 ----------
  await clickByText('#segVoice','英音');
  const v=await ev(()=>({S:S.voice,url:ttsURL('test','word')}));
  add('发音=英音（有道 type=0）', v.S==='uk' && /type=0/.test(v.url), v.url);

  // ---------- 停顿 ----------
  await clickByText('#segPause','4s');
  add('停顿=4s', await ev(()=>S.pause===4000));

  // ---------- 朗读中文/例句 ----------
  await clickByText('#segZh','关');
  await clickByText('#segEx','关');
  add('朗读中文/例句=关', await ev(()=>S.zh===false && S.ex===false));

  // ---------- 章节范围 ----------
  const q0=await ev(()=>queue.length);
  await ev(()=>document.getElementById('rangeBox').children[0].click());
  await p.waitForTimeout(200);
  const q1=await ev(()=>queue.length);
  add('范围（章节）筛选生效', q1<q0, q0+' -> '+q1);
  await ev(()=>document.getElementById('rangeBox').children[0].click());
  await p.waitForTimeout(150);

  // ---------- 跳过已掌握 ----------
  await clickByText('#segSkip','关');
  add('跳过已掌握=关', await ev(()=>S.skipOn===false));

  // ---------- 顺序 ----------
  await clickSel('#ordBtn');
  const o=await ev(()=>({S:S.order,label:document.getElementById('ordBtn').textContent}));
  add('顺序按钮→随机（文字同步）', o.S==='rand' && /随机/.test(o.label), JSON.stringify(o));

  // ---------- 收藏 / 认识 ----------
  const fav=await ev(()=>{const w=queue[qi];document.getElementById('favBtn').click();return {w:w.w,has:favs.has(w.w),cls:document.getElementById('favBtn').classList.contains('on')}});
  add('❤ 收藏当前词', fav.has && fav.cls, JSON.stringify(fav));
  const okc=await ev(()=>{const n0=queue.length;document.getElementById('okBtn').click();return {n0,n1:queue.length,cnt:document.getElementById('skipCnt').textContent}});
  add('✓ 认识（移出队列+计数）', okc.n1<okc.n0, JSON.stringify(okc));
  await clickSel('#clearSkip');
  add('清空已掌握', await ev(()=>document.getElementById('skipCnt').textContent.includes('0 词')));

  // ---------- 返回/关闭 ----------
  await clickSel('#sheetBack');
  add('设置右上「← 返回播放」可关闭', await ev(()=>!document.getElementById('sheet').classList.contains('on')));

  // ---------- 缩放选项存在 ----------
  add('缩放选项已渲染', await ev(()=>document.querySelectorAll('#segZoom b').length===4));

  // ---------- 持久化 ----------
  const ls=await ev(()=>{const c=JSON.parse(localStorage.getItem('listen_qq_cfg')||'{}');return {keys:Object.keys(c).sort().join(','), repeat:c.repeat, font:c.font, voice:c.voice}});
  add('配置写入 localStorage', ls.repeat===7 && ls.font==='serif' && ls.voice==='uk', JSON.stringify(ls));

  // ---------- 错误 ----------
  add('无 JS 运行错误', errs.length===0 && clog.length===0, (errs.concat(clog)).join(' | '));

  console.log(JSON.stringify(R,null,1));
  const bad=R.filter(x=>!x.ok);
  console.log('\n==== PASS '+(R.length-bad.length)+' / '+R.length+' ====');
  if(bad.length) console.log('FAILED: '+bad.map(x=>x.n+' :: '+x.info).join('\n         '));
  await b.close();
})().catch(e=>{ console.log('SCRIPT_ERROR: '+e.message); process.exit(1); });
