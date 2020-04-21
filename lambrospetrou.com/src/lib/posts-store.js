import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";

marked.setOptions({
  gfm: true,
  smartLists: true,
  smartypants: true,
  xhtml: true
});

function _readAllPosts(postsDirectory = path.join(process.cwd(), '_posts')) {
  const posts = [];

  fs.readdirSync(postsDirectory).forEach(filename => {
    // FIXME Handle directories as well!
    if (!filename.endsWith(".md")) {
      return;
    }

    // The substring-11 is to strip out the date part of the post names!
    const slug = filename.replace(/\.md$/, "").substring(11);

    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const {data, content} = matter(fileContents);

    // Combine the data with the slug and the markdown parsed to HTML.
    posts.push({
      ...data,
      slug,
      filename,
      content,
      contentHtml: marked(content)
    });
  });

  return posts;
}

export const readAllPosts = (() => {
  let posts = null;
  return () => {
    if (!posts) posts = _readAllPosts();
    return posts;
  };
})();

export function getAllPostSlugs() {
  return readAllPosts().map(post => post.slug);
}

export function getPostData(slug) {
  return readAllPosts().find(p => p.slug === slug);
}
