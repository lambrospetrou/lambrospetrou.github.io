import Head from "next/head";
import { Layout } from "../../components/layout";

export default function HireIndex() {
  return (
    <Layout>
      <Head>
        <meta http-equiv="refresh" content="0;URL='/consulting/'" />
        <title>Get expert help by Lambros Petrou</title>
      </Head>

      <p>This page moved to <a href="/consulting">/consulting</a>. Redirecting in 0 seconds!</p>

    </Layout>
  );
}
