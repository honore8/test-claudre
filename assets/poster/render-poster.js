/*
  Renders every poster deliverable from the single master source
  poster-master.html. The master's CSS is fully vw-relative (see the
  comment at the top of its <style> block), so re-composing for a
  different frame is just a matter of changing the Playwright viewport
  before capturing — no separate markup per format.

  Run: node render-poster.js
*/
const { chromium } = require('/tmp/claude-0/-home-user-test-claudre/c3a48887-3b6b-54a6-b18f-9f748b5d2d00/scratchpad/tools/node_modules/playwright');
const path = require('path');

const MASTER = 'file://' + path.resolve(__dirname, 'poster-master.html');
const OUT = (name) => path.resolve(__dirname, name);

async function main() {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

  // ---- 1080x1350 social exports (LinkedIn + Instagram feed, identical) ----
  {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
    await page.goto(MASTER);
    await page.screenshot({ path: OUT('poster-linkedin.png') });
    await page.screenshot({ path: OUT('poster-instagram-feed.png') });
    await page.close();
  }

  // ---- 1080x1920 Instagram story (re-composed, comb still centered) ----
  {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
    await page.goto(MASTER);
    await page.screenshot({ path: OUT('poster-instagram-story.png') });
    await page.close();
  }

  // ---- High-res raster at the true A2 aspect ratio (0.7071:1) ----
  {
    const page = await browser.newPage({ viewport: { width: 2000, height: 2828 }, deviceScaleFactor: 2 });
    await page.goto(MASTER);
    await page.screenshot({ path: OUT('poster-highres.png') });
    await page.close();
  }

  // ---- True print-size PDF: A2, 420mm x 594mm, via CSS @page ----
  {
    const page = await browser.newPage({ viewport: { width: 1000, height: 1414 }, deviceScaleFactor: 1 });
    await page.goto(MASTER);
    await page.pdf({
      path: OUT('poster-a2-print.pdf'),
      printBackground: true,
      preferCSSPageSize: true,
    });
    await page.close();
  }

  // ---- Digital-use PDF: sized to 1080x1350px converted to points (96dpi -> 72pt) ----
  {
    const pxToPt = (px) => (px * 72) / 96;
    const w = pxToPt(1080).toFixed(2);
    const h = pxToPt(1350).toFixed(2);
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
    await page.goto(MASTER);
    await page.addStyleTag({ content: `@page { size: ${w}pt ${h}pt; margin: 0; }` });
    await page.pdf({
      path: OUT('poster.pdf'),
      printBackground: true,
      preferCSSPageSize: true,
    });
    await page.close();
  }

  await browser.close();
  console.log('All poster deliverables rendered.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
