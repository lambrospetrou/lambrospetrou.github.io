import Head from "next/head";
import { readAllPosts } from "../lib/posts-store";
import { Layout } from "../components/layout";
import { ArticlesList } from "../components/articles";
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

      {/* <ElementsOfCICDBanner /> */}
      {/* <hr /> */}
      <WidgetsSection />
      <WritingSection posts={posts} />
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

function WidgetsSection() {
  return (<div className="home-widgets">
    <div className="home-widgets__item"><LearnWidget /></div>
    <div className="home-widgets__item"><RWLWidget /></div>
    <div className="home-widgets__item"></div>
  </div>);
}

function LearnWidget() {
  return (
    <section className="home-section">
      <hr/>
      <header><h2>Learn something</h2></header>
      <hr/>
      <div>
        <h3>&bull; <Aex
            href="https://www.elementsofcicd.com/?ref=lambrospetrou.com"
            title="The Elements of CI/CD landing page"
          >
            elementsofcicd.com
          </Aex></h3>
        <p><strong>Elements of CI/CD</strong> is a comprehensive Continuous Integration (CI) and Continuous Deployment (CD) course with advanced techniques that teach you how to <strong>ship your code with confidence!</strong></p>
      </div>
    </section>
  );
}

function RWLWidget() {
  return (
    <section className="home-section">
      <hr/>
      <header><h2>Check other content I like</h2></header>
      <hr/>
      <div>
        <h3>&bull; <a href="/read-watch-listen/" title="My Read-Watch-Listen list">Read-Watch-Listen list</a></h3>
        <p>My <strong>Read-Watch-Listen list</strong> contains the best content I find online. Topics range from tech, to investments, to career advice, to life, and more.</p>
      </div>
    </section>
  );
}

function WritingSection({posts}) {
  return (
    <section className="home-section inner-section">
      <header><h2>Read my writings</h2></header>
      <ArticlesList posts={posts}/>
    </section>
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
