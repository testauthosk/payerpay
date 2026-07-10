const { chromium } = require('C:/Users/openclaw/Desktop/hair-academy/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  for (const [w,h,tag] of [[1440,900,'1440'],[1280,720,'1280']]){
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:1.6 });
    await p.goto('file:///C:/Users/openclaw/Desktop/payerpay/app/desktop-personal.html');
    await p.waitForTimeout(700);
    const r = await p.evaluate(()=>{
      const sp=document.getElementById('sp-btc');
      const rail = sp? sp.closest('aside'):null;
      const railR = rail? rail.getBoundingClientRect():null;
      const news = rail? rail.lastElementChild.getBoundingClientRect():null;
      return { ovX:document.documentElement.scrollWidth-document.documentElement.clientWidth, railBottom: railR?Math.round(railR.bottom):0, newsBottom: news?Math.round(news.bottom):0, vh: window.innerHeight };
    });
    console.log(`${tag}: ovX=${r.ovX} railBottom=${r.railBottom} newsBottom=${r.newsBottom} vh=${r.vh} (rail fills if newsBottom≈vh)`);
    await p.screenshot({ path:`C:/Users/openclaw/Desktop/payerpay/nv-${tag}.png` });
    await p.close();
  }
  await b.close();
})();
