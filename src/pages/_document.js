import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script data-goatcounter="https://lambrospetrou.goatcounter.com/count" async="" src="/s/goatcounter.count.v3.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
