let pw; try{ pw=require('playwright'); }catch(e){ pw=require('playwright-core'); }
const F='file://'+require('path').resolve(__dirname,'..')+'/public/study/listen/GPT2_%E5%90%AC%E5%8A%9B.html';
(async()=>{
  const b=await pw.chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:900}});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto(F); await p.waitForTimeout(1000);
  const R=[];const add=(n,ok,i)=>R.push({n,ok:!!ok,info:i===undefined?'':String(i)});
  const ev=f=>p.evaluate(f);

  // 0) 初始：未收藏时心上有斜线
  const s0=await ev(()=>({favSlash:document.querySelector('#favBtn .slash')?'有':'无',
    okSlash:getComputedStyle(document.querySelector('#okBtn .slash')).opacity,src:S.source,q:queue.length}));
  add('默认无「划掉」标记（斜线只在点✓后）', s0.favSlash==='无' && s0.okSlash==='0' && s0.src==='all', JSON.stringify(s0));

  const w0=await ev(()=>queue[qi].w);

  // 1) 标星
  await ev(()=>document.getElementById('starBtn').click()); await p.waitForTimeout(200);
  const st=await ev(()=>({has:queue[qi]?stars.has(queue[qi].w):false,on:document.getElementById('starBtn').classList.contains('on'),cnt:document.getElementById('markCnt').textContent}));
  add('☆ 标星成功（图标点亮+计数）', st.has&&st.on&&/⭐ 1/.test(st.cnt), JSON.stringify(st));

  // 2) 切「仅⭐」→ 队列只剩星标词
  await ev(()=>document.getElementById('moreBtn').click()); await p.waitForTimeout(250);
  await ev(()=>[...document.querySelectorAll('#segSource b')].find(x=>x.textContent==='仅⭐').click()); await p.waitForTimeout(300);
  const sv=await ev(()=>({S:S.source,q:queue.length,w:queue[0]&&queue[0].w,shown:document.getElementById('wbig').textContent}));
  add('仅⭐：队列=星标词且正在显示它', sv.S==='star'&&sv.q===1&&sv.w===w0&&sv.shown===w0, JSON.stringify(sv));

  // 3) 朗读中取消星标 → 掉出队列 + 空池提示
  await ev(()=>document.getElementById('starBtn').click()); await p.waitForTimeout(300);
  const un=await ev(()=>({q:queue.length,has:stars.size>0,hint:document.getElementById('wmean').textContent,cnt:document.getElementById('markCnt').textContent}));
  add('取消星标→掉出队列并提示空池', un.q===0&&!un.has&&/还没有/.test(un.hint), JSON.stringify(un));

  // 4) 回「全部」
  await ev(()=>[...document.querySelectorAll('#segSource b')].find(x=>x.textContent==='全部').click()); await p.waitForTimeout(300);
  add('切回全部→队列恢复', await ev(()=>queue.length>200), await ev(()=>queue.length));

  // 5) 收藏：斜线消失 + 可只读收藏
  const w1=await ev(()=>queue[qi].w);
  await ev(()=>document.getElementById('favBtn').click()); await p.waitForTimeout(250);
  const fv=await ev(()=>({has:queue[qi]?favs.has(queue[qi].w):false,on:document.getElementById('favBtn').classList.contains('on'),
    fill:getComputedStyle(document.querySelector('#favBtn .heart')).fill}));
  add('❤ 收藏成功（实心填色）', fv.has&&fv.on&&fv.fill!=='none', JSON.stringify(fv));
  await ev(()=>[...document.querySelectorAll('#segSource b')].find(x=>x.textContent==='仅❤').click()); await p.waitForTimeout(300);
  const fq=await ev(()=>({S:S.source,q:queue.length,w:queue[0]&&queue[0].w}));
  add('仅❤：队列=收藏词', fq.S==='fav'&&fq.q===1&&fq.w===w1, JSON.stringify(fq));

  // 6) 收藏里「不读」（跳过）→ 掉出，再取消跳过 → 回来
  await ev(()=>document.getElementById('okBtn').click()); await p.waitForTimeout(300);
  const sk=await ev(()=>({q:queue.length,on:document.getElementById('okBtn').classList.contains('on'),
    slash:getComputedStyle(document.querySelector('#okBtn .slash')).opacity}));
  add('仅❤ 里点「不读」→ 掉出队列并划掉', sk.q===0&&sk.on===true&&sk.slash==='1', JSON.stringify(sk));
  await ev(()=>document.getElementById('clearSkip').click()); await p.waitForTimeout(300);
  add('清空不读→收藏词回到队列', await ev(()=>queue.length===1), await ev(()=>queue.length));

  // 7) 清空星标按钮
  await ev(()=>{document.getElementById('clearStar').click()}); await p.waitForTimeout(200);
  add('清空星标按钮可用', await ev(()=>stars.size===0));

  add('无 JS 报错', errs.length===0, errs.join(' | '));
  console.log(JSON.stringify(R,null,1));
  const bad=R.filter(x=>!x.ok);
  console.log('\n==== PASS '+(R.length-bad.length)+' / '+R.length+' ====');
  if(bad.length)console.log('FAILED: '+bad.map(x=>x.n+' :: '+x.info).join('\n         '));
  await b.close();
})().catch(e=>{console.log('ERR '+e.message);process.exit(1)});
