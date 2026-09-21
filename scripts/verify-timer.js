let pw; try{ pw=require('playwright'); }catch(e){ pw=require('playwright-core'); }
const F='file:///Users/milong/Desktop/code/zcode-test/papers/listen-new/GPT2_%E5%90%AC%E5%8A%9B.html';
(async()=>{
  const b=await pw.chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:900}});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto(F); await p.waitForTimeout(1000);
  const R=[];const add=(n,ok,i)=>R.push({n,ok:!!ok,info:i===undefined?'':String(i)});
  const ev=f=>p.evaluate(f);

  add('默认无倒计时', await ev(()=>getComputedStyle(document.getElementById('timerChip')).display==='none'));

  // 选 5 分
  await ev(()=>document.getElementById('moreBtn').click()); await p.waitForTimeout(250);
  await ev(()=>[...document.querySelectorAll('#segTimer b')].find(x=>x.textContent==='5分').click());
  await p.waitForTimeout(300);
  const t1=await ev(()=>({S:S.timer,chip:document.getElementById('timerChip').textContent,disp:getComputedStyle(document.getElementById('timerChip')).display,left:timerLeft}));
  add('选 5 分：显示 5:00 倒计时', t1.S===5&&t1.left>295&&/5:0/.test(t1.chip)&&t1.disp!=='none', JSON.stringify(t1));

  await p.waitForTimeout(2300);
  const t2=await ev(()=>({chip:document.getElementById('timerChip').textContent,left:timerLeft}));
  add('倒计时在走（2s 后减少）', t2.left<300 && t2.left>290, JSON.stringify(t2));

  // 关掉
  await ev(()=>[...document.querySelectorAll('#segTimer b')].find(x=>x.textContent==='关').click());
  await p.waitForTimeout(250);
  const t3=await ev(()=>({S:S.timer,disp:getComputedStyle(document.getElementById('timerChip')).display,int:timerInt}));
  add('选「关」：倒计时隐藏且定时器清空', t3.S===0&&t3.disp==='none'&&t3.int===null, JSON.stringify(t3));

  // 模拟到点：设 2 秒
  await ev(()=>startTimer(60)); await p.waitForTimeout(150);
  await ev(()=>{ timerLeft=2; setPlaying(true); });      // 假装正在播放
  await p.waitForTimeout(2600);
  const t4=await ev(()=>({chip:getComputedStyle(document.getElementById('timerChip')).display,left:timerLeft,playing:playing,int:timerInt,toast:document.getElementById('toast').textContent}));
  add('到点：停止播放+隐藏倒计时+提示', t4.playing===false&&t4.chip==='none'&&t4.left===0&&/定时/.test(t4.toast), JSON.stringify(t4));

  add('无 JS 报错', errs.length===0, errs.join(' | '));
  console.log(JSON.stringify(R,null,1));
  const bad=R.filter(x=>!x.ok);
  console.log('\n==== PASS '+(R.length-bad.length)+' / '+R.length+' ====');
  if(bad.length)console.log('FAILED: '+bad.map(x=>x.n+' :: '+x.info).join('\n         '));
  await b.close();
})().catch(e=>{console.log('ERR '+e.message);process.exit(1)});
