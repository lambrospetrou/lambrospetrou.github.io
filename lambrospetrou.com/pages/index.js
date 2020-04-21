import { readAllPosts } from "../lib/posts-store";
import Footer from "../components/footer";

export default function ArticlesIndex({posts}) {
  return (
    <>
      <ul class="index-posts">
        {posts.map(p => <PostEntry key={p.slug} post={p}/>)}
      </ul>
      <Footer />
    </>
  );
};

function PostEntry({post}) {
  return (
    <li>
      <article>
        <header>
          <h2 class="post-title"><a href={`/articles/${post.slug}`} title="view post">{post.title}</a></h2>
          {/* <div class="post-meta">{{ $element.FormattedCreatedTime }}</div> */}
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
