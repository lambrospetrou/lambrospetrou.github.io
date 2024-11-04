import Head from "next/head";
import { readAllPosts } from "../lib/posts-store";
import { Layout } from "../components/layout";
import { ArticlesList } from "../components/articles";
import { ConsultingAction, InterviewConsultingAction } from "../pages/consulting";

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

      <WidgetsSection widgets={[<BookInterviewSessionWidget />, <SkybearCtaWidget />]} />
      <AristotleQuote />
      <WidgetsSection widgets={[<NewsletterWidget/>, <RWLWidget />]} />      
      <WritingSection posts={posts} />
    </Layout>
  );
}

function HeroBanner() {
  return (
    <div className="home-hero-banner">
      <h1>I turn ideas into <span className="text-bg-gradient">robust</span> and <span className="text-bg-gradient">reliable</span> software products.</h1>
    </div>
  );
}

function WidgetsSection({widgets}) {
  return (<div className="home-widgets">
    {
      widgets.map((w, idx) => <div className="home-widgets__item" key={idx}>{w}</div>)
    }
  </div>);
}

function NewsletterWidget() {
  return (
    <section className="home-section">
      <div>
        {/** https://www.toptal.com/designers/htmlarrows/symbols/ */}
        <h3>&#10148; <a
            href="/newsletter/?ref=homepage"
            title="Lambros Petrou newsletter"
          >
            Sign up to my newsletter
          </a></h3>
        <p>
          At <em>most one email per month</em> with all my new articles, product announcements and launch deals.
          <br/>
          Nothing new, means no email at all.
          <br/>
          <strong>No spam. No gimmicks.</strong>
        </p>
      </div>
    </section>
  );
}

function RWLWidget() {
  return (
    <section className="home-section">
      <div>
        <h3>&#10148; <a href="/read-watch-listen/?ref=homepage" title="My Read-Watch-Listen list">Read-Watch-Listen list</a></h3>
        <p>My <strong>Read-Watch-Listen list</strong> references content I read, watched, and listened, worthy of sharing!
        <br/>Topics covered include technical articles, career advice, business and startups, life, and more.</p>
      </div>
    </section>
  );
}

function BookInterviewSessionWidget() {
  return (
    <section className="home-section">
      <div>
        <h3>&#10148; <a href="/tech-interviews/?ref=homepage-interview-cta" title="Book an interview preparation session">Software interview preparation</a></h3>
        <p>If you want a software job in a Big Tech (FAANG) company, I can help you prepare!</p>
        <InterviewConsultingAction />
      </div>
    </section>
  );
}

function SkybearCtaWidget() {
  return (
    <section className="home-section">
      <div>
        <h3>&#10148; <a href="https://www.skybear.net" title="Try Skybear.NET Platform" target="_blank">Skybear.NET Scripts</a></h3>
        <p><span className="skybear-name">Skybear<span>.NET</span></span> is a managed platform automating Synthetic HTTP API testing.</p>
        <HomeCtaWidgetSkybearAction />
      </div>
    </section>
  );
}

function HomeCtaWidgetSkybearAction() {
  return <div className="consulting-cta-container">
    <a className="cta-consult" href="https://www.skybear.net" title="Try Skybear.NET Scripts" target="_blank" rel="noopener noreferrer">
      <span>
        Try Skybear.NET
        <small>Simplify your HTTP API testing.</small>
      </span>
    </a>
  </div>
}

function WritingSection({posts}) {
  return (
    <section className="home-section inner-section">
      <header><h2>Articles</h2></header>
      <ArticlesList posts={posts}/>
    </section>
  );
}

function AristotleQuote() {
  return (
    <div className="home-aristotle-quote"><blockquote><p>"We are what we repeatedly do. Excellence then, is not an act, but a habit!"&#x2009;&mdash;&#x2009;Aristotle</p></blockquote></div> 
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
      }).map(({ date, slug, title, isDraft }) => ({
        date,
        slug,
        title,
        isDraft,
      })),
    },
  };
}
