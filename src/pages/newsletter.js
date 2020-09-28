import Head from 'next/head'
import {Layout} from "../components/layout";
import { FavouriteArticlesList } from '../components/favourite-articles';

export default function NewsletterSignupSuccess({}) {
  const title = "Newsletter signup | Lambros Petrou";
  const desc = "Subscribe to my newsletter for a weekly email with my latest articles.";
  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://www.lambrospetrou.com/" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc}/>
        <meta name="description" content={desc}/>
      </Head>
      <h1>Don't miss new articles 📰</h1>
      <FavouriteArticlesList heading="Not convinced? Read some of my favourite articles" />
      <p>
        Use the form below to subscribe to my newsletter for a monthly email with my latest articles.
        <br/>
        I promise not to spam you, only one email per month if there are new articles or no email at all.
      </p>
    </Layout>
  );
};
