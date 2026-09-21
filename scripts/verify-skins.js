let pw; try{ pw=require('playwright'); }catch(e){ pw=require('playwright-core'); }
const ROOT=require('path').resolve(__dirname,'..');
const F='file://'+ROOT+'/public/study/listen/GPT2_%E5%90%AC%E5%8A%9B.html';
const OUT=ROOT+'/temp/skin-previews/';
(async()=>{
  const b=await pw.chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:820}});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto(F); await p.waitForTimeout(1000);
  const R=[];const add=(n,ok,i)=>R.push({n,ok:!!ok,info:i===undefined?'':String(i)});

  add('皮肤总数=10', await p.evaluate(()=>SKINS.length===10), await p.evaluate(()=>SKINS.map(s=>s.n).join('/')));
  // 译文一行
  const m=await p.evaluate(()=>{const e=document.getElementById('wmean');const cs=getComputedStyle(e);
    return {fs:cs.fontSize,ws:cs.whiteSpace,lh:cs.lineHeight,h:e.offsetHeight}});
  add('译文单行+字号收小', m.ws==='nowrap' && parseFloat(m.fs)<20, JSON.stringify(m));

  for(const id of ['lemon','nred','qqgreen','kugou','xiami','vinylx']){
    await p.evaluate(s=>{ applySkin(s,false); document.getElementById('sheet').classList.remove('on'); }, id);
    await p.waitForTimeout(450);
    await p.screenshot({path:OUT+id+'.png'});
  }
  const cur=await p.evaluate(()=>document.getElementById('app').dataset.skin);
  add('切换后皮肤生效', cur==='vinylx', 'now='+cur);
  add('无 JS 报错', errs.length===0, errs.join(' | '));
  console.log(JSON.stringify(R,null,1));
  const bad=R.filter(x=>!x.ok);
  console.log('\n==== PASS '+(R.length-bad.length)+' / '+R.length+' ====');
  if(bad.length)console.log('FAILED: '+bad.map(x=>x.n+' :: '+x.info).join('\n         '));
  await b.close();
})().catch(e=>{console.log('ERR '+e.message);process.exit(1)});
