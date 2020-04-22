export const CodeHighlightScripts = ({}) => {
  // I prefer using the following scripts instead of including them in this bundle
  // to avoid delaying them, since the main bundle takes more time to fetch!
  // Also, since we use the `autoloader` we cannot host them since it uses relative
  // URLs to load the detected languages, otherwise I would need to get all of the languages I need.
  return (
    <>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/prism-core.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/plugins/autoloader/prism-autoloader.min.js"></script>
    </>
  );
};
