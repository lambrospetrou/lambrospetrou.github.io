import { useEffect } from "react";
import { initHighlightingOnLoad } from "highlight.js";

export const CodeHighlightScripts = ({}) => {
  // This replaces the explicit script in normal static site generators! (see below)
  useEffect(() => {
    initHighlightingOnLoad();
  }, []);

  return (
    <>
      {/* The CSS is now imported in `_app.js` directly */}
      {/* <link href="/s/js/highlight-styles/solarized-light.css" rel="stylesheet" type="text/css"/> */}
      {/* Uncomment the following for a normal static side generator! Now we use `highlightjs` straight from `marked()`. */}
      {/* <script type="text/javascript" src="/s/js/highlight.pack.js"/> */}
      {/* <script dangerouslySetInnerHTML={{ __html: `hljs.initHighlightingOnLoad();`}}/> */}
    </>
  );
};
