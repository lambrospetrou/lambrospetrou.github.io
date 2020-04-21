import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { toHtml } from "./markdown";

function _readAllPosts(postsDirectory = path.join(process.cwd(), '_posts')) {
  const posts = [];

  fs.readdirSync(postsDirectory).forEach(filename => {
    const isSingleFile = filename.endsWith(".md");
    if (!isSingleFile) return;

    const dateSlug = filename.substring(0, 10);
    const slug = filename.replace(/\.md$/, "").substring(dateSlug.length + 1);

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
      contentHtml: toHtml(content),
      dateSlug,
      date: Date.parse(dateSlug)
    });
  });

  return posts;
}

export const readAllPosts = (() => {
  let posts = null;
  return () => {
    if (null === posts) posts = _readAllPosts();
    return posts;
  };
})();

export function getAllPostSlugs() {
  return readAllPosts().map(post => post.slug);
}

export function getPostData(slug) {
  return readAllPosts().find(p => p.slug === slug);
}
