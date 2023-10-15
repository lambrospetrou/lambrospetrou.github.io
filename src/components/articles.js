import { dateToNoteGroup } from "./display-formatters";

export function ArticlesList({ posts }) {
  console.log(posts[posts.length-1])
  posts = posts.filter(p => !Boolean(p.isDraft));

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
    <div className="articles-list">
      { postsByDateGroup.map(group => (
        <section className="note-group" key={dateToNoteGroup(group[0].date)}>
          <span className="note-group__title">{dateToNoteGroup(group[0].date)}</span>
          <ul className="note-group__list">
            {group.map((p) => (
              <PostEntry key={p.slug} post={p} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function PostEntry({ post }) {
  const { slug, title } = post;
  return (
    <li><a href={`/articles/${slug}`} title="read article">{title}</a></li>
  );
}
