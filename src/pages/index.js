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

      <WidgetsSection widgets={[<BookInterviewSessionWidget />, <ConsultingSessionWidget />]} />
      <AristotleQuote />
      <WidgetsSection widgets={[<NewsletterWidget/>, <RWLWidget />]} />      
      <WritingSection posts={posts} />
    </Layout>
  );
}

function HeroBanner() {
  return (
    <div className="home-hero-banner">
      <p>I turn ideas into <span className="text-bg-gradient">robust</span> and <span className="text-bg-gradient">reliable</span> software products.</p>
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
        <h3>&#10148; <a href="/consulting/?ref=homepage-interview-cta" title="Book an interview preparation session">Software interview preparation</a></h3>
        <p>If you want to get a software job in a Big Tech (FAANG) company, I can help you prepare!</p>
        <InterviewConsultingAction />
      </div>
    </section>
  );
}

function ConsultingSessionWidget() {
  return (
    <section className="home-section">
      <div>
        <h3>&#10148; <a href="/consulting/?ref=homepage-consulting-cta" title="Book a consulting session">Expert Consulting</a></h3>
        <p>If you want expert help in websites & APIs development, Cloud infrastructure, or CI/CD pipelines, get in touch!</p>
        <ConsultingAction />
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
      }).map(({ date, slug, title }) => ({
        date,
        slug,
        title,
      })),
    },
  };
}
