// 线上审计：多视口、关键状态截图 + 横向溢出/元素越界/面板行溢出/JS报错
let pw; try{ pw=require('playwright'); }catch(e){ pw=require('playwright-core'); }
const ROOT=require('path').resolve(__dirname,'..');
const URL='file://'+ROOT+'/public/study/listen/GPT2_%E5%90%AC%E5%8A%9B.html';
const OUT=ROOT+'/temp/audit/';
const fs=require('fs'); fs.mkdirSync(OUT,{recursive:true});

(async()=>{
  const b=await pw.chromium.launch();
  const probe=async(w,h,label,extra)=>{
    const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1.5});
    const errs=[]; p.on('pageerror',e=>errs.push(e.message));
    const cons=[]; p.on('console',m=>{if(m.type()==='error')cons.push(m.text())});
    await p.goto(URL,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(2500);
    if(extra) await extra(p);
    await p.screenshot({path:OUT+label+'.png',fullPage:true});
    const r=await p.evaluate(()=>{
      const vw=innerWidth, vh=innerHeight, out=[];
      document.querySelectorAll('.app *').forEach(el=>{
        const b=el.getBoundingClientRect();
        if(b.width>0.5&&(b.right>vw+1||b.left<-1)) out.push((el.id||el.className||el.tagName)+'');
      });
      const s=document.getElementById('sheet');
      s.classList.add('on');
      const badRows=[...s.querySelectorAll('.srow')].filter(x=>x.scrollWidth>x.clientWidth+1)
        .map(x=>x.querySelector('span').textContent.trim());
      const sheetBad=[...s.querySelectorAll('.seg')].filter(x=>x.scrollWidth>x.clientWidth+1).length;
      // 每一行都滚到可视区中央，判断是否真的可达
      s.scrollTop=0;
      const unreachable=[];
      [...s.querySelectorAll('.srow')].forEach(r=>{
        r.scrollIntoView({block:'center'});
        const b=r.getBoundingClientRect();
        if(b.top<-1||b.bottom>innerHeight+1) unreachable.push((r.querySelector('span')||{}).textContent||'?');
      });
      const scrollable=s.scrollHeight>s.clientHeight+1;
      s.scrollTop=0; s.classList.remove('on');
      return {vw, hscroll:document.documentElement.scrollWidth>vw+1, sw:document.documentElement.scrollWidth,
              outOfView:[...new Set(out)].slice(0,10), badRows, sheetBad, sheetH:s.offsetHeight, vh,
              sheetScrollable:scrollable, unreachable};
    });
    await p.close();
    return {label, ...r, errs, cons};
  };

  const res=[];
  res.push(await probe(390,844,'narrow-default'));
  res.push(await probe(390,844,'narrow-sheet',async p=>{
    await p.evaluate(()=>document.getElementById('moreBtn').click()); await p.waitForTimeout(400);
  }));
  res.push(await probe(390,844,'narrow-playing',async p=>{
    await p.evaluate(()=>{ setPlaying(true); playCurrent(); }); await p.waitForTimeout(2500);
  }));
  res.push(await probe(1280,820,'wide-default'));
  res.push(await probe(1280,820,'wide-sheet',async p=>{
    await p.evaluate(()=>document.getElementById('moreBtn').click()); await p.waitForTimeout(400);
  }));
  console.log(JSON.stringify(res,null,1));
  await b.close();
})().catch(e=>{console.log('ERR '+e.message);process.exit(1)});
