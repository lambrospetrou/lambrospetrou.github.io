const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { toHtml } = require("../lib/markdown.js");

function _readAllPosts(
  postsDirectory = path.join(process.cwd(), "src", "_posts")
) {
  const posts = [];

  fs.readdirSync(postsDirectory).forEach((filename) => {
    const isSingleFile = filename.endsWith(".md");

    const dateSlug = filename.substring(0, 10);
    const slug = filename.replace(/\.md$/, "").substring(dateSlug.length + 1);

    const fullPath = isSingleFile
      ? path.join(postsDirectory, filename)
      : path.join(postsDirectory, filename, `${filename}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Combine the data with the slug and the markdown parsed to HTML.
    posts.push({
      ...data,
      slug,
      filename,
      content,
      contentHtml: toHtml(content),
      dateSlug,
      date: Date.parse(dateSlug),
    });
  });

  return posts;
}

const readAllPosts = (() => {
  let posts = null;
  return (options = {}) => {
    const { reloadPosts = false } = options;
    if (null === posts || reloadPosts) posts = _readAllPosts();
    return posts;
  };
})();

function getAllPostSlugs() {
  return readAllPosts().map((post) => post.slug);
}

function getPostData(slug, options = {}) {
  const { reloadPosts = false } = options;
  return (reloadPosts ? _readAllPosts : readAllPosts)().find(
    (p) => p.slug === slug
  );
}

module.exports = {
  readAllPosts,
  getAllPostSlugs,
  getPostData,
};
