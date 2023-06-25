import Head from "next/head";
import { readAllPosts } from "../../lib/posts-store";
import { Layout } from "../../components/layout";
import { ArticlesList } from "../../components/articles";

export default function ArticlesIndex({ posts }) {
  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://www.lambrospetrou.com/notes/" />
        <title>Articles by Lambros Petrou</title>
        <meta property="og:title" content="Notes by Lambros Petrou" />
        <meta
          property="og:description"
          content="Articles and posts I write about tech, business, career growth, and more."
        />
        <meta
          name="description"
          content="Articles and posts I write about tech, business, career growth, and more."
        />
      </Head>
      <ArticlesList posts={posts}/>
    </Layout>
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
