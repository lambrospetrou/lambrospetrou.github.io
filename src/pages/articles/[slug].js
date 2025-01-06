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
    og_image
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
        <meta property="og:type" content="article" />
        {og_image && <meta property="og:image" content={og_image} />}
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
            {/* social share buttons here, but removed now. */}
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
