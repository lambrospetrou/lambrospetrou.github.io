import marked from "marked";

marked.setOptions({
  gfm: true,
  smartLists: true,
  smartypants: true,
  xhtml: true,
});

export const toHtml = content => marked(content);
