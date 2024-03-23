const {marked} = require("marked");

const renderer = new marked.Renderer();

// Override the heading renderer for h2 to h7
renderer.heading = function(text, level) {
  if (level >= 2) {
    const slugifiedText = text
      .toLowerCase()
      .replace(/[^\w]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `<h${level} id="${slugifiedText}"><a href="#${slugifiedText}">${text}</a></h${level}>`;
  } else {
    return marked.Renderer.prototype.heading.apply(this, arguments);
  }
};

const options = {
  gfm: true,
  smartLists: true,
  smartypants: true,
  xhtml: true,
  renderer,
};

const toHtml = content => marked(content, options);
module.exports = {
  toHtml
};
