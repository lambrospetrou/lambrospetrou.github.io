const fs = require("fs");
const path = require("path");
const { DataList, getItemId, getHostname } = require("../lib/data-for-rwl");

function main() {
  const {Feed} = require("feed");
  const feedDoc = new Feed({
    title: "The Read-Watch-Listen list from Lambros Petrou RSS Feed",
    description: "Interesting articles, audio, and videos, that I find great and are worthy of sharing!",
    id: "https://www.lambrospetrou.com/read-watch-listen",
    // TODO: https://validator.w3.org/feed/docs/atom.html#link
    link: "https://www.lambrospetrou.com/read-watch-listen",
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}, Lambros Petrou`,
    updated: DataList.length && new Date(DataList[0].dateListed),
    feedLinks: {
      json: "https://www.lambrospetrou.com/feed/read-watch-listen.rss.json",
      atom: "https://www.lambrospetrou.com/feed/read-watch-listen.atom.xml",
      rss: "https://www.lambrospetrou.com/feed/read-watch-listen.rss.xml"
    },
    author: {
      name: "Lambros Petrou",
      email: "lambros@lambrospetrou.com",
      link: "https://www.lambrospetrou.com"
    }
  });

  DataList.forEach(item => {
    const hostname = getHostname(item.url);
    const id = getItemId(item);
    
    feedDoc.addItem({
      title: item.title,
      id: id,
      link: `https://www.lambrospetrou.com/read-watch-listen#${id}`,
      content: item.url,
      author: [
        {
          name: `${item.author} @ ${hostname}`
        }
      ],
      date: new Date(item.dateListed)
    });
  });

  const nextOutputDirectory = path.join(process.cwd(), '_site');
  const feedOutputDirectory = path.join(nextOutputDirectory, "feed");

  fs.mkdirSync(feedOutputDirectory, {recursive: true});
  fs.writeFileSync(path.join(feedOutputDirectory, "read-watch-listen.rss.json"), feedDoc.json1());
  fs.writeFileSync(path.join(feedOutputDirectory, "read-watch-listen.atom.xml"), feedDoc.atom1());
  fs.writeFileSync(path.join(feedOutputDirectory, "read-watch-listen.rss.xml"), feedDoc.rss2());
}

main();
