import Head from "next/head";
import { readAllPosts } from "../lib/posts-store";
import { Layout } from "../components/layout";
import { dateToLongDisplay } from "../components/display-formatters";
import { Aex } from "../components/common";

export default function HomeIndex({ posts }) {
  posts.sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return (
    <Layout wrapInnerSection={false}>
      <Head>
        <link rel="canonical" href="https://www.lambrospetrou.com/" />
        <title>Home | Lambros Petrou</title>
        <meta property="og:title" content="Home | Lambros Petrou" />
        <meta
          property="og:description"
          content="My personal blog where I publish my thoughts."
        />
        <meta
          name="description"
          content="My personal blog where I publish my thoughts."
        />
      </Head>

      <HeroBanner />

      <ElementsOfCICDBanner />
      {/* <hr /> */}
      <ul className="index-posts">
        {posts.map((p) => (
          <PostEntry key={p.slug} post={p} />
        ))}
      </ul>
    </Layout>
  );
}

function HeroBanner() {
  return (
    <div className="home-hero-banner">
      <span>I turn ideas into robust<br/> and reliable software products.</span>
    </div>
  );
}

function ElementsOfCICDBanner() {
  return (
    <div className="elements-of-cicd-banner">
      <p>
        👋 Checkout my new advanced CI/CD course:{" "}
        <strong>
          <Aex
            href="https://www.elementsofcicd.com/?ref=lambrospetrou.com"
            title="The Elements of CI/CD landing page"
          >
            The Elements of CI/CD
          </Aex>
        </strong>{" "}
      </p>
    </div>
  );
}

function PostEntry({ post }) {
  const { date, slug, title } = post;
  return (
    <li>
      <article>
        <header>
          <h2 className="post-title">
            <a href={`/articles/${slug}`} title="view post">
              {title}
            </a>
          </h2>
          <div className="post-meta">{dateToLongDisplay(date)}</div>
        </header>
      </article>
    </li>
  );
}

/////////////////
// NextJS hooks!
/////////////////

export async function getStaticProps({ preview }) {
  return {
    props: {
      posts: readAllPosts({
        reloadPosts: preview,
      }).map(({ date, slug, title }) => ({
        date,
        slug,
        title,
      })),
    },
  };
}
