import Head from "next/head";
import { Layout } from "../../components/layout";
import { getAllPostSlugs, getPostData } from "../../lib/posts-store";
import { dateToLongDisplay } from "../../components/display-formatters";

export default function Post({ postData }) {
  const {
    title,
    description,
    canonical_url: canonicalInput,
    slug,
    date,
    contentHtml,
  } = postData;
  let canonicalUrl = (canonicalInput || "").trim();
  if (canonicalUrl === "") {
    canonicalUrl = `https://www.lambrospetrou.com/articles/${slug}/`;
  }

  return (
    <Layout>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <title>{title} | Lambros Petrou</title>
        <meta property="og:title" content={`${title} | Lambros Petrou`} />
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
      </Head>

      <article className="post">
        <header>
          <h1 className="post-title">{title}</h1>
        </header>

        <section
          className="post-body"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <br />
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <section>
            <a
              className="twitter-share-button"
              data-via="lambrospetrou"
              href="https://twitter.com/intent/tweet"
            >
              Tweet
            </a>
            {/* The following will generate a warning like `index.js:1 Warning: Extra attributes from the server` 
                because once the script loads it adds the attribute and then when React hydration kicks in
                does not generate the same DOM. This is fine since we use `export` to static files.*/}
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
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
            `,
              }}
            />
          </section>
          <div className="post-meta">
            <span>{dateToLongDisplay(date)}</span>
          </div>
        </div>
      </article>
    </Layout>
  );
}

/////////////////
// NextJS hooks!
/////////////////

export async function getStaticProps({ params, preview }) {
  const postData = getPostData(params.slug, {
    reloadPosts: preview,
  });

  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs().map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
}
