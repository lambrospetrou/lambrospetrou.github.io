import Head from "next/head";
import { readAllNotes } from "../../lib/posts-store";
import { Layout } from "../../components/layout";
import { dateToNoteGroup } from "../../components/display-formatters";

export default function ArticlesIndex({ posts }) {
  posts.sort((a, b) => b.date.valueOf() - a.date.valueOf());
  
  const postsByDateGroup = [];
  posts.forEach(post => {
    const dateGroup = dateToNoteGroup(post.date);
    const sz = postsByDateGroup.length;
    if (sz <= 0) {
      postsByDateGroup.push([post]);
    } else {
      if (dateToNoteGroup(postsByDateGroup[sz-1][0].date) === dateGroup) {
        postsByDateGroup[sz-1].push(post);
      } else {
        postsByDateGroup.push([post]);
      }
    }
  });

  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://www.lambrospetrou.com/notes/" />
        <title>Notes by Lambros Petrou</title>
        <meta property="og:title" content="Notes by Lambros Petrou" />
        <meta
          property="og:description"
          content="Unstructured bits of knowledge, a brain dump, about different topics I want to archive for easy access."
        />
        <meta
          name="description"
          content="Unstructured bits of knowledge, a brain dump, about different topics I want to archive for easy access."
        />
      </Head>
      {
        postsByDateGroup.map(group => (
          <section className="note-group" key={dateToNoteGroup(group[0].date)}>
            <span className="note-group__title">{dateToNoteGroup(group[0].date)}</span>
            <ul className="note-group__list">
              {group.map((p) => (
                <PostEntry key={p.slug} post={p} />
              ))}
            </ul>
          </section>
        ))
      }
    </Layout>
  );
}

function PostEntry({ post }) {
  const { slug, title } = post;
  return (
    <li><a href={`/notes/${slug}`} title="read note">{title}</a></li>
  );
}

/////////////////
// NextJS hooks!
/////////////////

export async function getStaticProps({ preview }) {
  return {
    props: {
      posts: readAllNotes({
        reloadPosts: preview,
      }).map(({ date, slug, title }) => ({
        date,
        slug,
        title,
      })),
    },
  };
}
