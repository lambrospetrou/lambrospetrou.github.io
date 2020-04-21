import { readAllPosts } from "../lib/posts-store";
import {Layout} from "../components/layout";
import {dateToLongDisplay} from "../components/display-formatters";

export default function ArticlesIndex({posts}) {
  posts.sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return (
    <Layout>
      <ul className="index-posts">
        {posts.map(p => <PostEntry key={p.slug} post={p}/>)}
      </ul>
    </Layout>
  );
};

function PostEntry({post}) {
  const {date, slug, title} = post;
  return (
    <li>
      <article>
        <header>
          <h2 className="post-title"><a href={`/articles/${slug}`} title="view post">{title}</a></h2>
          <div className="post-meta">{dateToLongDisplay(date)}</div>
        </header>
      </article>
    </li>
  );
}

/////////////////
// NextJS hooks!
/////////////////

export async function getStaticProps() {
  return {
    props: {
      posts: readAllPosts()
    }
  };
}
