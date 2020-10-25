const fs = require("fs");
const path = require("path");
const { readAllPosts } = require("../lib/posts-store.js");

function main() {
  const posts = readAllPosts()
    .sort((a, b) => b.date - a.date);

  const {Feed} = require("feed");
  const feedDoc = new Feed({
    title: "Lambros Petrou RSS Feed",
    description: "Stay updated with all the new articles from lambrospetrou.com.",
    id: "https://www.lambrospetrou.com/",
    link: "https://www.lambrospetrou.com/",
    language: "en",
    // image: "http://example.com/image.png",
    // favicon: "https://www.lambrospetrou.com/",
    copyright: `All rights reserved ${new Date().getFullYear()}, Lambros Petrou`,
    updated: posts.length && new Date(posts[0].date),
    feedLinks: {
      json: "https://www.lambrospetrou.com/feed/rss.json",
      atom: "https://www.lambrospetrou.com/feed/atom.xml",
      rss: "https://www.lambrospetrou.com/feed/rss.xml"
    },
    author: {
      name: "Lambros Petrou",
      email: "lambros@lambrospetrou.com",
      link: "https://www.lambrospetrou.com"
    }
  });

  posts.forEach(post => {
    feedDoc.addItem({
      title: post.title,
      id: post.slug,
      link: `https://www.lambrospetrou.com/articles/${post.slug}/`,
      description: post.description,
      content: post.contentHtml, // TODO (Needs the `markdown.js`)
      author: [
        {
          name: "Lambros Petrou",
          email: "lambros@lambrospetrou.com",
          link: "https://www.lambrospetrou.com"
        }
      ],
      date: new Date(post.date)
    });
  });

  const nextOutputDirectory = path.join(process.cwd(), '_site');
  const feedOutputDirectory = path.join(nextOutputDirectory, "feed");

  fs.mkdirSync(feedOutputDirectory, {recursive: true});
  fs.writeFileSync(path.join(feedOutputDirectory, "rss.json"), feedDoc.json1());
  fs.writeFileSync(path.join(feedOutputDirectory, "atom.xml"), feedDoc.atom1());
  fs.writeFileSync(path.join(feedOutputDirectory, "rss.xml"), feedDoc.rss2());
}

main();
