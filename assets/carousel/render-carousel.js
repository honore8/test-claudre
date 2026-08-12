/*
  Renders slide-1.html .. slide-7.html to individual PNGs (1080x1350,
  deviceScaleFactor 2 for crispness) and combines them into one
  multi-page carousel.pdf, one page per slide at a 1080x1350px-equivalent
  page size.

  Run: node render-carousel.js
*/
const { chromium } = require('/tmp/claude-0/-home-user-test-claudre/c3a48887-3b6b-54a6-b18f-9f748b5d2d00/scratchpad/tools/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const DIR = __dirname;
const SLIDES = fs
  .readdirSync(DIR)
  .filter((f) => /^slide-\d+\.html$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));

const pxToPt = (px) => (px * 72) / 96;
const PAGE_W = pxToPt(1080).toFixed(2);
const PAGE_H = pxToPt(1350).toFixed(2);
const PAGE_STYLE = `@page { size: ${PAGE_W}pt ${PAGE_H}pt; margin: 0; }`;

async function main() {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

  // ---- Individual PNGs ----
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  for (const slide of SLIDES) {
    await page.goto('file://' + path.resolve(DIR, slide));
    const outName = slide.replace('.html', '.png');
    await page.screenshot({ path: path.resolve(DIR, outName) });
    console.log('rendered', outName);
  }
  await page.close();

  // ---- Combined multi-page PDF ----
  const pdfPage = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const tmpPdfs = [];
  for (const slide of SLIDES) {
    await pdfPage.goto('file://' + path.resolve(DIR, slide));
    await pdfPage.addStyleTag({ content: PAGE_STYLE });
    const tmp = path.resolve(DIR, slide.replace('.html', '.tmp.pdf'));
    await pdfPage.pdf({ path: tmp, printBackground: true, preferCSSPageSize: true });
    tmpPdfs.push(tmp);
  }
  await pdfPage.close();
  await browser.close();

  // Merge single-page PDFs into one multi-page carousel.pdf using pdf-lib
  // if available; otherwise fall back to a simple manual PDF concat via
  // pdftk/qpdf/gs if present on the system.
  await mergePdfs(tmpPdfs, path.resolve(DIR, 'carousel.pdf'));
  for (const t of tmpPdfs) fs.unlinkSync(t);

  console.log('All carousel deliverables rendered.');
}

async function mergePdfs(inputPaths, outputPath) {
  // Try pdf-lib first (pure JS, no external binary needed).
  let PDFLib;
  try {
    PDFLib = require('/tmp/claude-0/-home-user-test-claudre/c3a48887-3b6b-54a6-b18f-9f748b5d2d00/scratchpad/tools/node_modules/pdf-lib');
  } catch (e) {
    PDFLib = null;
  }

  if (PDFLib) {
    const { PDFDocument } = PDFLib;
    const merged = await PDFDocument.create();
    for (const p of inputPaths) {
      const bytes = fs.readFileSync(p);
      const doc = await PDFDocument.load(bytes);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach((pg) => merged.addPage(pg));
    }
    const out = await merged.save();
    fs.writeFileSync(outputPath, out);
    return;
  }

  // Fallback: shell out to qpdf or pdftk or ghostscript if installed.
  const { execFileSync } = require('child_process');
  const tryBin = (cmd, args) => {
    try {
      execFileSync(cmd, args, { stdio: 'ignore' });
      return true;
    } catch (e) {
      return false;
    }
  };
  if (tryBin('qpdf', ['--empty', '--pages', ...inputPaths, '--', outputPath])) return;
  if (tryBin('gs', ['-dBATCH', '-dNOPAUSE', '-sDEVICE=pdfwrite', `-sOutputFile=${outputPath}`, ...inputPaths])) return;

  throw new Error('No PDF merge method available (need pdf-lib, qpdf, or ghostscript).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
