import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked"

marked.setOptions({
  gfm: true,
  smartLists: true,
  smartypants: true,
  xhtml: true
});

const postsDirectory = path.join(process.cwd(), '_posts');

const slugToFilename = (() => {
  let m = null;
  return slug => {
    if (!m) {
      m = getAllPostsSlugToFilename();
    }
    if (!m[slug]) {
      throw new Error(`Mapping does not contain requested 'slug': ${slug}`);
    }
    return m[slug];
  };
})();

function getAllPostsSlugToFilename() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.filter(f => f.endsWith(".md")).map(fileName => {
    console.log(fileName)
    // TODO Take care of the directories!!!

    const slug = fileName.replace(/\.md$/, "").substring(11);

    return {
      [slug]: fileName
    };
  }).reduce((all, entry) => ({...all, ...entry}), {});
}

export function getAllPostSlugs() {
  const mapping = getAllPostsSlugToFilename();
  return Object.keys(mapping);
}

export async function getPostData(slug) {
  const filename = slugToFilename(slug);
  const fullPath = path.join(postsDirectory, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const {data, content} = matter(fileContents)

  // Combine the data with the id
  return {
    ...data,
    slug,
    content,
    contentHtml: await markdownToHtml(content)
  };
}

async function markdownToHtml(markdown) {
  return marked(markdown);
}
