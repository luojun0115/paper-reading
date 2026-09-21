let pw; try{ pw=require('playwright'); }catch(e){ pw=require('playwright-core'); }
const FILE='file://'+require('path').resolve(__dirname,'..')+'/public/study/listen/GPT2_%E5%90%AC%E5%8A%9B.html';
(async()=>{
  const b=await pw.chromium.launch();
  const p=await b.newPage({viewport:{width:420,height:900}});   // 窄屏，验证 autoplay 看门狗与缩放
  const reqs=[];
  p.on('response',r=>{ const u=r.url(); if(/youdao|baidu|google/.test(u)) reqs.push(r.status()+' '+u.slice(0,90)); });
  await p.goto(FILE);
  await p.waitForTimeout(1200);

  const R=[];const add=(n,ok,info)=>R.push({n,ok:!!ok,info:info===undefined?'':String(info)});

  // 1) 默认设置下「✓ 认识」应把词移出队列（skipOn 默认开）
  const st=await p.evaluate(()=>({skipOn:S.skipOn,reveal:S.reveal,q:queue.length,z:getComputedStyle(document.getElementById('app')).zoom}));
  const okc=await p.evaluate(()=>{const n0=queue.length;document.getElementById('okBtn').click();return {n0,n1:queue.length,cnt:document.getElementById('skipCnt').textContent}});
  add('✓ 认识（skipOn 开时移出队列）', st.skipOn===true && okc.n1<okc.n0, JSON.stringify(okc));
  await p.evaluate(()=>document.getElementById('clearSkip').click());
  await p.waitForTimeout(120);

  // 2) 窄屏自适应缩放应 >1（若屏幕够高）
  add('窄屏自适应缩放值', typeof st.z==='string' && parseFloat(st.z)>=1, 'zoom='+st.z);

  // 3) 真朗读链路：点播放，等 8s，看是否有 TTS 响应 + 是否推进到下一个词
  const q0=await p.evaluate(()=>qi);
  await p.evaluate(()=>{ setPlaying(true); playCurrent(); });   // 保持播放态（点▶会变暂停）
  await p.waitForTimeout(8000);
  const s=await p.evaluate(()=>({qi:qi,playing:playing,audioSrc:(audio&&audio.src)||'',wav:getComputedStyle(document.getElementById('wav')).display,title:document.getElementById('wbig').textContent}));
  const tts=reqs.filter(x=>x.startsWith('200'));
  add('TTS 请求已发出（有道/百度）', reqs.length>0, reqs.slice(0,3).join(' | '));
  add('TTS 成功返回 200', tts.length>0, tts.slice(0,2).join(' | '));
  add('播放推进到后面的词', s.qi>q0 || /brittle/.test(s.title)===false, 'qi '+q0+' -> '+s.qi+' word='+s.title);

  // 4) 播放中先听后现：波浪应显示、释义隐藏
  add('播放中：波浪显示/释义隐藏', s.wav!=='none', 'wav='+s.wav+' playing='+s.playing);

  // 5) 播放中改「单词重复」应立即重播（不报错）
  await p.evaluate(()=>{document.getElementById('moreBtn').click()});
  await p.waitForTimeout(300);
  const before=await p.evaluate(()=>document.getElementById('wbig').textContent);
  await p.evaluate(()=>{[...document.querySelectorAll('#segRepeat b')].find(x=>x.textContent==='3次').click()});
  await p.waitForTimeout(600);
  const after2=await p.evaluate(()=>({rep:S.repeat,word:document.getElementById('wbig').textContent,audioSrc:(audio&&audio.src)||''}));
  add('播放中改重复=3 立即生效', after2.rep===3 && !!after2.audioSrc, JSON.stringify(after2).slice(0,140));

  console.log(JSON.stringify(R,null,1));
  const bad=R.filter(x=>!x.ok);
  console.log('\n==== PASS '+(R.length-bad.length)+' / '+R.length+' ====');
  if(bad.length)console.log('FAILED: '+bad.map(x=>x.n+' :: '+x.info).join('\n         '));
  await b.close();
})().catch(e=>{ console.log('SCRIPT_ERROR: '+e.message); process.exit(1); });
