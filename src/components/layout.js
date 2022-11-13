import Head from 'next/head'
import {CodeHighlightScripts} from "./code-highlight"
import {InlineSignup} from "./newsletter-signup";

export const Layout = ({children}) => {
  return (
    <>
      <HeadAdditions/>
      <div id="outer-wrapper">
        <Header/>
        <div id="content-wrapper" className="outer-section">
            <div id="inner-content" className="inner-section">
              {children}
            </div>
        </div>
        <Footer/>
      </div>
      <CodeHighlightScripts/>
    </>
  );
};

const HeadAdditions = ({}) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1"/>

      <script dangerouslySetInnerHTML={{ __html: `
      var WebFontConfig = {
        google: {
            families: [
                'Source Sans Pro:300,400,400italic,700,700italic,900:greek,latin',
                // Read https://github.com/typekit/webfontloader/issues/409 about the 'display=swap'
                'Source Code Pro:400&display=swap',
            ]
        }
      };
      (function() {
          var wf = document.createElement('script');
          wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
          wf.type = 'text/javascript';
          wf.async = 'true';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(wf, s);
      })();
      `}}/>

      <noscript>
        <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,400italic,700,700italic,900|Source+Code+Pro&subset=latin,greek&display=swap' rel='stylesheet' type='text/css'/>
      </noscript>

      <meta name="keywords" content="Lambros,Petrou,amazon,codeguru,profiler,facebook,portfolio,programming,developer,coder,software engineer,ucy,oxford" />
      <meta name="author" content="Lambros Petrou" />
      <meta name="owner" content="Lambros Petrou" />
      <meta name="copyright" content={`${new Date().getFullYear()} Lambros Petrou`} />
      <meta name="robots" content="all" />

      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="article:author" content="https://www.lambrospetrou.com" />
      <meta property="article:publisher" content="https://www.lambrospetrou.com" />
      <meta property="og:site_name" content="Lambros Petrou blog"/>

      <link id="page_favicon" href="data:image/x-icon;base64,R0lGODlhEAAQAPEAAAAAAJYeHgAAAAAAACH5BAkeAAIAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEgiAIghAEgSAIgSAEgSAIQhAQCAICQUAgEAQCAkEgIBAIAgJBICAQCAICQUAgEAQCAoEgEBAIBIGAQCAIBAQCgUAQCAgEgYBAEBAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJHgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIgiAIgiAIgiAIgiAIQhAEgiAIghAIBAQCQUAgCAQEAoEgEBAIAgJBQCAQBAICQSAgEAgCAkEgIBAIAgJBQCAQBAICgSAQEAgEgYBAIBAQICAgICAQECAgEBAgIBAQICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJHgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEgiAIghAEgSAIgSAEgSAIQhAQCAICQUAgEAQCAkEgIBAIAgJBICAQCAICQUAgEAQCAoEgEBAIBIGAQCAIBAQCgUAQCAgEgYBAEBAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJHgACACwAAAAAEAAQAAAC55QkIiIiIoQQQogQghBCCBEEgSAIgSAEgSAIQhAIQiAIgSAIQSAIQSAQCAICQSAgEAgCAkFAIBAEAgKBIBAQCASBgEAgCAQEAoFAEAgIBIGAQBAICAQCgUAgEAgEgYBAICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJHgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEgiAIghAEgSAIgSAEgSAIQhAQCAICQUAgEAQCAkEgIBAIAgJBICAQCAICQUAgEAQCAoEgEBAIBIGAQCAIBAQCgUAQCAgEgYBAEBAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAA7" rel="icon" type="image/x-icon"/>
    </Head>
  )
};

const SocialIcon = ({name}) => {
  // Credit to: https://simpleicons.org/?q=github
  switch(name) {
  case "linkedin":
    return <a href="https://www.linkedin.com/in/lambrospetrou/" title="Lambros Petrou on LinkedIn " target="_blank" rel="noopener"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>;
  case "twitter":
    return <a href="https://twitter.com/lambrospetrou" title="Tweets" target="_blank" rel="noopener"><svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>;
  case "github":
    return <a href="https://github.com/lambrospetrou" title="Public code" target="_blank" rel="noopener">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Github</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    </a>
  }
};

const Header = ({}) => {
  return (
    <header id="header-wrapper" className="outer-section">
      <div className="header-signup-strip">
        <small><a href="/newsletter">Subscribe to my newsletter</a></small>
      </div>
      <div id="inner-header" className="inner-section">
        {/* <div id="header-logo">
          <a href="/" title="Aries Ram - Click to vew all posts">
            <img alt="Aries logo" title="Go to homepage" width="60px" height="60px" src="data:image/png;base64,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" />
          </a>
        </div> */}
        <div id="header-social">
          <SocialIcon name="linkedin"/>
          <SocialIcon name="twitter"/>
          <SocialIcon name="github"/>
        </div>
        <div id="header-name">Lambros Petrou</div>
        <div id="header-quote">"We are what we repeatedly do. Excellence then, is not an act, but a habit!"&#x2009;&mdash;&#x2009;Aristotle</div>
        <div id="nav-buttons">
          <a href="/" title="All Articles - Lambros Petrou">Articles</a>
          <a href="/read-watch-listen/" title="My Read-Watch-Listen list">Read-Watch-Listen</a>
          <a href="/cv/" title="Lambros Petrou Resume - CV" rel="noopener" target="_blank">CV</a>
          <a href="https://temp.minibri.com" title="Minibri Temp - Share content with expiration" rel="noopener" target="_blank">Minibri Temp</a>
          <a href="/feed/rss.xml" title="Subscribe to my RSS Feed" target="_blank" rel="noopener">RSS Feed</a>
        </div>
      </div>
    </header>
  );
};

const Footer = ({}) => {
  return (
    <footer id="footer-wrapper" className="outer-section">
      <div id="inner-footer" className="inner-section clearfix">
        <InlineSignup/>
        {/* <div id="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Lambros Petrou</p>
        </div>
        <div id="footer-links">
          <p><a href="https://lambrospetrou.com" title="Lambros Petrou homepage">lambrospetrou.com</a></p>
        </div> */}
      </div>
    </footer>
  )
};
