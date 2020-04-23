export const CodeHighlightScripts = ({}) => {
  // I prefer using the following scripts instead of including them in this bundle
  // to avoid delaying them, since the main bundle takes more time to fetch!
  // Also, since we use the `autoloader` we provide the `data-autoloader-path`
  // to avoid having all the languages bundled in this package.
  return (
    <>
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/prism-core.min.js"/>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/plugins/autoloader/prism-autoloader.min.js"/> */}
      <script src="/s/prismjs/prism-core.min.js"/>
      <script src="/s/prismjs/prism-autoloader.min.js" data-autoloader-path="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/"/>
    </>
  );
};
