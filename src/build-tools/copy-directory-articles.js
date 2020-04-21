/**
 * FIXME FIXME FIXME
 * This script is temporary to keep the current structure of the `_posts`.
 * As of now each directory inside `_posts` can hold assets, like images,
 * into the same directory and the site generator moves them into the output
 * directory of that article.
 * 
 * However, `next.js` does not support assets inside the `pages` folders, so
 * any content of an article should be moved into the `public` folder and change 
 * all the links that reference those assets.
 * It's not many articles but for now this is faster to get this out.
 * 
 * Limitations:
 * - When running in `npm run dev` the assets won't exist in the output directory!
 */

const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

const postsDirectory = path.join(process.cwd(), "src", '_posts');
const nextOutputDirectory = path.join(process.cwd(), 'out');
const postsOutputDirectory = path.join(nextOutputDirectory, "articles");

console.log(`Copying directory articles to ${nextOutputDirectory}`);
fs.readdirSync(postsDirectory).forEach(filename => {
  const isSingleFile = filename.endsWith(".md");
  if (isSingleFile) return;

  // Directories are prefixed by date like `2020-04-18-post-article`
  const slug = filename.substring(11);
  const from = path.join(postsDirectory, filename);
  const to = path.join(postsOutputDirectory, slug);
  fse.copySync(from, to, {
    overwrite: false,
    errorOnExist: false
  });
});
