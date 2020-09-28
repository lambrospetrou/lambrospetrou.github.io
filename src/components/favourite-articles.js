export const FavouriteArticlesList = ({
  heading = "Read some of my favourite articles"
}) => {
  return (
    <section>
      <h4>{heading}</h4>
      <ul>
        <li><a href="/articles/golang-v8-isolates/">V8 Isolates for fast JavaScript execution in Go</a></li>
        <li><a href="/articles/make-it-work-make-it-beautiful-make-it-fast/">Make it Work, Make it Beautiful, Make it Fast</a></li>
        <li><a href="/articles/best-tip-the-worklog/">Best tip I received — The worklog</a></li>
        <li><a href="/articles/amazon-leadership-principles/">Amazon Leadership Principles — Choose 3</a></li>
        <li><a href="/articles/banana-or-human-marginal-degradation/">Banana or Human, and Marginal Degradation</a></li>
      </ul>
    </section>
  );
};
