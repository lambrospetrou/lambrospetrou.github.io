import Head from 'next/head'
import {CodeHighlightScripts} from "./code-highlight"
import {InlineSignup} from "./newsletter-signup";

export const Layout = ({children, wrapInnerSection, className}) => {
  wrapInnerSection = wrapInnerSection ?? true;
  className = className || "";

  let content = children;
  if (wrapInnerSection) {
    content = (
      <div id="inner-content" className="inner-section">
        {children}
      </div>
    )
  }
  return (
    <>
      <HeadAdditions/>
      <div id="outer-wrapper" className={className}>
        <Header/>
        <div id="content-wrapper" className="outer-section">
            {content}
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

      {/* <script dangerouslySetInnerHTML={{ __html: `
      var WebFontConfig = {
        google: {
            families: [
                'Source Sans Pro:200,400,400italic,700,700italic,900:greek,latin',
                'Source Serif Pro:200,400,900:latin',
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
        <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,400italic,700,700italic,900|Source+Serif+Pro:200,400,900|Source+Code+Pro&subset=latin,greek&display=swap' rel='stylesheet' type='text/css'/>
      </noscript> */}

      <meta name="keywords" content="Lambros,Petrou,datadog,amazon,codeguru,profiler,facebook,portfolio,programming,developer,coder,software engineer,ucy,oxford" />
      <meta name="author" content="Lambros Petrou" />
      <meta name="owner" content="Lambros Petrou" />
      <meta name="copyright" content={`${new Date().getFullYear()} Lambros Petrou`} />
      <meta name="robots" content="all" />

      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="article:author" content="https://www.lambrospetrou.com" />
      <meta property="article:publisher" content="https://www.lambrospetrou.com" />
      <meta property="og:site_name" content="Lambros Petrou personal website"/>

      <link id="page_favicon" href="data:image/x-icon;base64,R0lGODlhEAAQAPEAAAAAAJYeHgAAAAAAACH5BAkeAAIAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEgiAIghAEgSAIgSAEgSAIQhAQCAICQUAgEAQCAkEgIBAIAgJBICAQCAICQUAgEAQCAoEgEBAIBIGAQCAIBAQCgUAQCAgEgYBAEBAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJHgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIgiAIgiAIgiAIgiAIQhAEgiAIghAIBAQCQUAgCAQEAoEgEBAIAgJBQCAQBAICQSAgEAgCAkEgIBAIAgJBQCAQBAICgSAQEAgEgYBAIBAQICAgICAQECAgEBAgIBAQICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJHgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEgiAIghAEgSAIgSAEgSAIQhAQCAICQUAgEAQCAkEgIBAIAgJBICAQCAICQUAgEAQCAoEgEBAIBIGAQCAIBAQCgUAQCAgEgYBAEBAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJHgACACwAAAAAEAAQAAAC55QkIiIiIoQQQogQghBCCBEEgSAIgSAEgSAIQhAIQiAIgSAIQSAIQSAQCAICQSAgEAgCAkFAIBAEAgKBIBAQCASBgEAgCAQEAoFAEAgIBIGAQBAICAQCgUAgEAgEgYBAICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAAh+QQJHgACACwAAAAAEAAQAAAC55QkIiIiIoQQQgghhBBCCCEIgiAIQhAEgiAIghAEgSAIgSAEgSAIQhAQCAICQUAgEAQCAkEgIBAIAgJBICAQCAICQUAgEAQCAoEgEBAIBIGAQCAIBAQCgUAQCAgEgYBAEBAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgEBAgICAgICAgICAgICAgIBAQICAgICAgICAgICAgICAQECAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQIAAAQIKAAA7" rel="icon" type="image/x-icon"/>
    </Head>
  )
};

const SocialIcon = ({name}) => {
  // Credit to: https://simpleicons.org/?q=github
  switch(name) {
  case "linkedin":
    return <a className="svg-link" href="https://www.linkedin.com/in/lambrospetrou/" title="Lambros Petrou on LinkedIn " target="_blank" rel="noopener"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>;
  case "twitter":
    return <a className="svg-link" href="https://twitter.com/lambrospetrou" title="Tweets" target="_blank" rel="noopener"><svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>;
  case "github":
    return <a className="svg-link" href="https://github.com/lambrospetrou" title="Public code" target="_blank" rel="noopener">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Github</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    </a>
  case "mastodon":
    return <a className="svg-link" href="https://fosstodon.org/@lambrospetrou" title="Lambros Petrou on Mastodon / Fosstodon" target="_blank" rel="me"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 16 16"><path d="M11.19 12.195c2.016-.24 3.77-1.475 3.99-2.603.348-1.778.32-4.339.32-4.339 0-3.47-2.286-4.488-2.286-4.488C12.062.238 10.083.017 8.027 0h-.05C5.92.017 3.942.238 2.79.765c0 0-2.285 1.017-2.285 4.488l-.002.662c-.004.64-.007 1.35.011 2.091.083 3.394.626 6.74 3.78 7.57 1.454.383 2.703.463 3.709.408 1.823-.1 2.847-.647 2.847-.647l-.06-1.317s-1.303.41-2.767.36c-1.45-.05-2.98-.156-3.215-1.928a3.614 3.614 0 0 1-.033-.496s1.424.346 3.228.428c1.103.05 2.137-.064 3.188-.189zm1.613-2.47H11.13v-4.08c0-.859-.364-1.295-1.091-1.295-.804 0-1.207.517-1.207 1.541v2.233H7.168V5.89c0-1.024-.403-1.541-1.207-1.541-.727 0-1.091.436-1.091 1.296v4.079H3.197V5.522c0-.859.22-1.541.66-2.046.456-.505 1.052-.764 1.793-.764.856 0 1.504.328 1.933.983L8 4.39l.417-.695c.429-.655 1.077-.983 1.934-.983.74 0 1.336.259 1.791.764.442.505.661 1.187.661 2.046v4.203z"/></svg></a>;
  case "rss":
    return <a className="svg-link" href="/feed/rss.xml" title="Subscribe to my RSS Feed" target="_blank" rel="noopener"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>RSS</title><path d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z"/></svg></a>;
  }
};

const Header = ({}) => {
  return (
    <header id="header-wrapper" className="outer-section">
      <div className="header-strip">
        <div id="inner-header" className="inner-section">
          <div className="name-hire">
            <div id="header-name"><a href="/" title="LambrosPetrou.com home page">Lambros Petrou</a> <SocialIcon name="rss"/></div>
          </div>

          <div id="nav-buttons">
            <a href="/articles" title="All Articles by Lambros Petrou">Articles</a>
            <a href="/read-watch-listen/" title="My Read-Watch-Listen list">Read-Watch-Listen</a>
            <a href="/cv/" title="Lambros Petrou Resume - CV" rel="noopener" target="_blank">CV</a>
            <a href="https://www.skybear.net" title="Skybear.net Scripts" rel="noopener" target="_blank">Skybear.net Scripts</a>
            {/* <a href="https://temp.minibri.com" title="Minibri Temp - Share content with expiration" rel="noopener" target="_blank">Minibri Temp</a> */}
            <a className="cta-hire" href="/consulting/" >Consulting</a>
            {/* <a href="/feed/rss.xml" title="Subscribe to my RSS Feed" target="_blank" rel="noopener">RSS Feed</a> */}
          </div>
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
        <div id="header-social">
          <SocialIcon name="github"/>
          <SocialIcon name="linkedin"/>
          <SocialIcon name="twitter"/>
          <SocialIcon name="mastodon"/>
        </div>
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
