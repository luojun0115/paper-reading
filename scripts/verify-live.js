// 线上环境烟测：确认部署后的听力页在真实 https 下可用（含在线 TTS 是否可达）
// 运行：NODE_PATH=/Users/milong/.workbuddy/binaries/node/workspace/node_modules node verify-live.js
let pw; try{ pw=require('playwright'); }catch(e){ pw=require('playwright-core'); }
const URL='https://luojun0115.github.io/paper-reading/study/listen/GPT2_%E5%90%AC%E5%8A%9B.html';
(async()=>{
  const b=await pw.chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:820}});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  const tts=[]; p.on('response',r=>{ const u=r.url(); if(/youdao|baidu/.test(u)) tts.push(r.status()); });
  await p.goto(URL,{waitUntil:'domcontentloaded'});
  await p.waitForTimeout(6000);
  const s=await p.evaluate(()=>({
    items:ITEMS.length, word:document.getElementById('wbig').textContent,
    ipa:document.getElementById('wipa').textContent, sec:document.getElementById('wsec').textContent,
    skins:SKINS.length, tab:document.getElementById('app').dataset.skin,
    playing:playing, q:queue.length, title:document.title
  }));
  console.log(JSON.stringify(s,null,1));
  console.log('TTS 响应:', tts.length? tts.join(','):'(无)');
  console.log('JS 报错:', errs.length? errs.join(' | '):'无');
  const ok = errs.length===0 && s.items>0 && /^\/.+\/$/.test(s.ipa) && s.skins===10 && tts.some(c=>c===200);
  console.log('\n==== 线上烟测 '+(ok?'PASS':'FAIL')+' ====');
  await b.close();
  process.exit(ok?0:1);
})().catch(e=>{console.log('ERR '+e.message);process.exit(1)});
