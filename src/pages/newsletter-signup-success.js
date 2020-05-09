import Head from 'next/head'
import {Layout} from "../components/layout";

export default function NewsletterSignupSuccess({}) {
  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://www.lambrospetrou.com/" />
        <title>Newsletter signup pending confirmation | Lambros Petrou</title>
        <meta property="og:title" content="Home | Lambros Petrou" />
        <meta property="og:description" content="My personal blog where I publish my thoughts."/>
        <meta name="description" content="My personal blog where I publish my thoughts."/>
      </Head>
      <h1>Thank you for subscribing ⏳</h1>
      <p>Please check your inbox for the signup confirmation email from <code>lambros@lambrospetrou.com</code>. You won't receive any newsletter updates unless you verify your email address.</p>
    </Layout>
  );
};
