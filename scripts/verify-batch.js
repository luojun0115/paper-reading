// 批量产物冒烟测试：抽样若干页，检查无 JS 报错、单词/音标/角标正常、词数>0
// 运行：NODE_PATH=/Users/milong/.workbuddy/binaries/node/workspace/node_modules node verify-batch.js [样本数]
let pw; try{ pw=require('playwright'); }catch(e){ pw=require('playwright-core'); }
const fs=require('fs'), path=require('path');
const DIR='/Users/milong/Desktop/code/zcode-test/papers/listen-new/';
const N=parseInt(process.argv[2]||'8',10);
(async()=>{
  const files=fs.readdirSync(DIR).filter(f=>f.endsWith('.html')).sort();
  const step=Math.max(1,Math.floor(files.length/N));
  const sample=files.filter((_,i)=>i%step===0).slice(0,N);
  const b=await pw.chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:820}});
  let pass=0, fail=[];
  for(const f of sample){
    const errs=[]; const h=e=>errs.push(e.message);
    p.on('pageerror',h);
    await p.goto('file://'+encodeURI(path.join(DIR,f)));
    await p.waitForTimeout(700);
    const s=await p.evaluate(()=>({items:ITEMS.length,word:document.getElementById('wbig').textContent,
      ipa:document.getElementById('wipa').textContent,sec:document.getElementById('wsec').textContent,
      title:document.title}));
    p.off('pageerror',h);
    const ok = errs.length===0 && s.items>0 && /^\/.+\/$/.test(s.ipa) && /第 /.test(s.sec);
    if(ok)pass++; else fail.push(f+' :: '+JSON.stringify(s)+' :: '+errs.join('|'));
  }
  console.log('抽样 '+sample.length+' 篇，通过 '+pass);
  console.log('样本: '+sample.join(', '));
  if(fail.length)console.log('失败:\n  '+fail.join('\n  '));
  await b.close();
  process.exit(fail.length?1:0);
})().catch(e=>{console.log('ERR '+e.message);process.exit(1)});
