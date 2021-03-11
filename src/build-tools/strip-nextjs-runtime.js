const fs = require("fs");
const path = require("path");

const cheerio = require('cheerio');

// Has to be run from the root directory (package.json directory).
const nextOutputDirectory = path.join(process.cwd(), '_site');

// The list of pages to exclude from NextJS Runtime stripping.
// Example: "articles/a-journey-through-email-providers/index.html"
const PAGES_NEED_NEXTJS_RUNTIME = new Set([
  // ...
].map(f => path.join(nextOutputDirectory, f)));

console.log(`Stripping Next.js runtime from the generated website... ${nextOutputDirectory}`);
walk(nextOutputDirectory);

function walk(dirPath) {
  fs.readdirSync(dirPath, {
    withFileTypes: true
  }).forEach(dirEntry => {
    const fullPath = path.join(dirPath, dirEntry.name);
    if (dirEntry.isDirectory()) {
      return walk(fullPath);
    }
    if (dirEntry.isFile() && fullPath.endsWith(".html")) {
      maybeStripHtml(fullPath);
    }
  });
}

function maybeStripHtml(filename) {
  console.log(`Stripping NextJS from '${filename}'`);
  if (PAGES_NEED_NEXTJS_RUNTIME.has(filename)) {
    console.info(`\t:: Skipping the strip for ${filename}`);
    return;
  }

  const htmlOriginal = fs.readFileSync(filename, "utf-8");
  const $ = cheerio.load(htmlOriginal);

  $("script#__NEXT_DATA__").remove();
  $(`script[src^="/_next/"][src$=".js"]`).remove();
  $(`link[href^="/_next/"][href$=".js"]`).remove();

  const htmlFinal = $.root().html();

  fs.writeFileSync(filename, htmlFinal);
}
