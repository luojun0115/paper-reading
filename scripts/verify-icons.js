// 截取顶栏「收藏/星标」两种状态的放大图，用于目视核对图标
// 运行：NODE_PATH=/Users/milong/.workbuddy/binaries/node/workspace/node_modules node verify-icons.js
let pw; try{ pw=require('playwright'); }catch(e){ pw=require('playwright-core'); }
const F='file://'+require('path').resolve(__dirname,'..')+'/public/study/listen/GPT2_%E5%90%AC%E5%8A%9B.html';
(async()=>{
  const b=await pw.chromium.launch();
  const p=await b.newPage({viewport:{width:1280,height:820},deviceScaleFactor:2});
  await p.goto(F); await p.waitForTimeout(900);
  await p.evaluate(()=>applySkin('nred',false));      // 红皮最看得出来染色问题
  await p.waitForTimeout(300);
  await p.screenshot({path:'/tmp/icons-default.png',clip:{x:820,y:100,width:440,height:80}});
  const d=await p.evaluate(()=>({
    favSlash:document.querySelector('#favBtn .slash')?'有(不该有)':'无',
    okSlash:getComputedStyle(document.querySelector('#okBtn .slash')).opacity
  }));
  console.log('默认态：', JSON.stringify(d));
  await p.evaluate(()=>{document.getElementById('favBtn').click();document.getElementById('okBtn').click()});
  await p.waitForTimeout(400);
  await p.screenshot({path:'/tmp/icons-on.png',clip:{x:820,y:100,width:440,height:80}});
  const st=await p.evaluate(()=>({
    okSlash:getComputedStyle(document.querySelector('#okBtn .slash')).opacity,
    heartFill:getComputedStyle(document.querySelector('#favBtn .heart')).fill
  }));
  console.log('标记后：', JSON.stringify(st));
  console.log('图：/tmp/icons-default.png（默认）  /tmp/icons-on.png（已标记）');
  await b.close();
})().catch(e=>{console.log('ERR '+e.message);process.exit(1)});
