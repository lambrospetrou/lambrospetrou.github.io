const {marked} = require("marked");

const options = {
  gfm: true,
  smartLists: true,
  smartypants: true,
  xhtml: true,
};

const toHtml = content => marked(content, options);
module.exports = {
  toHtml
};
