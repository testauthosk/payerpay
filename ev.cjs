const { chromium } = require('C:/Users/openclaw/Desktop/hair-academy/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  for (const [w,h,tag] of [[1440,900,'1440'],[1280,800,'1280']]){
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:1.6 });
    await p.goto('file:///C:/Users/openclaw/Desktop/payerpay/app/desktop-personal.html');
    await p.waitForTimeout(700);
    const r = await p.evaluate(()=>({ ovX:document.documentElement.scrollWidth-document.documentElement.clientWidth }));
    console.log(`${tag}: overflowX=${r.ovX}`);
    await p.screenshot({ path:`C:/Users/openclaw/Desktop/payerpay/ev-${tag}.png` });
    await p.close();
  }
  await b.close();
})();
