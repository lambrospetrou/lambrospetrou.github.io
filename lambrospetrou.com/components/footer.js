export default function Footer({}) {
  return (
    <>
      {/*
      <footer id="footer-wrapper" class="outer-section">
          <div id="inner-footer" class="inner-section clearfix">
            <div id="footer-copyright">
                <p>&copy; {{ .Year }} Lambros Petrou</p>
            </div>
              <div id="footer-links">
                  <p><a href="https://lambrospetrou.com" title="Lambros Petrou homepage">lambrospetrou.com</a></p>
              </div>
      </div>
      </footer>*/}
      <link href="/s/js/highlight-styles/solarized-light.css" rel="stylesheet" type="text/css"/>
      <script src="/s/js/highlight.pack.js"/>
      <script dangerouslySetInnerHTML={{ __html: `hljs.initHighlightingOnLoad();`}}/>
    </>
  );
}
