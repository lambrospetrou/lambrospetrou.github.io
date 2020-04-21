import {getAllPostSlugs, getPostData} from "../../lib/posts-store";
import Footer from "../../components/footer";

export default function Post({ postData }) {
  const {title, description, slug, date, contentHtml} = postData;

  return (
    <>
      <article className="post">
        <header>
          <h1 className="post-title">{title}</h1>
          <div className="post-meta">
            <span>{date}</span>
          </div>
        </header> 

        <section className="post-body" dangerouslySetInnerHTML={{ __html: contentHtml }}/>
        
        <br/>
        <section>
            <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
            window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
              t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function(f) {
              t._e.push(f);
            };

            return t;
          }(document, "script", "twitter-wjs"));
          `}}/>
          <a className="twitter-share-button" data-via="lambrospetrou" href="https://twitter.com/intent/tweet">Tweet</a>
        </section>
      </article>
      <Footer />
    </>
  )
}

/////////////////
// NextJS hooks!
/////////////////

export async function getStaticProps({ params }) {
  const postData = getPostData(params.slug);
  
  return {
    props: {
      postData
    }
  };
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs().map(slug => ({
    params: {slug}
  }));
  return {
    paths,
    fallback: false
  }
}
