const marked = require("marked");

marked.setOptions({
  gfm: true,
  smartLists: true,
  smartypants: true,
  xhtml: true,
});

const toHtml = content => marked(content);
module.exports = {
  toHtml
};
