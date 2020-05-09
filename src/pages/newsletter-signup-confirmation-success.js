import Head from 'next/head'
import {Layout} from "../components/layout";

export default function NewsletterSignupSuccess({}) {
  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://www.lambrospetrou.com/" />
        <title>Newsletter signup confirmed | Lambros Petrou</title>
        <meta property="og:title" content="Home | Lambros Petrou" />
        <meta property="og:description" content="My personal blog where I publish my thoughts."/>
        <meta name="description" content="My personal blog where I publish my thoughts."/>
      </Head>
      <h1>Thank you for confirming your subscription 📰</h1>
      <p>Don't hesitate contacting me regarding my content, or asking for help in your own adventure.</p>
    </Layout>
  );
};
