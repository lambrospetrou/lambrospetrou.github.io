// We cannot use the CDN URL for the CSS like we do for the JS script because we want
// to override a few of the CSS properties in our CSS...
import "../../public/s/prismjs/prism.css";
import "../scss/style.scss";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
