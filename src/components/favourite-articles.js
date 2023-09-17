export const FavouriteArticlesList = ({
  heading = "Read some of my favourite articles"
}) => {
  return (
    <section>
      <h4>{heading}</h4>
      <ul>
        <li><a href="/articles/big-tech-software-interviews">How to pass the interview for software engineering roles in Big Tech</a></li>
        <li><a href="/articles/cicd-feature-flags/">Feature Flags — CI/CD</a></li>
        <li><a href="/articles/fast-feedback-loop-vs-delayed-gratification/">Fast Feedback Loop and Delayed Gratification</a></li>
        <li><a href="/articles/hell-yeah-or-no-highlights/">Hell Yeah or No - what's worth doing | Highlights</a></li>
        <li><a href="/articles/keeping-the-brain-engaged/">Keeping the brain engaged</a></li>
        <li><a href="/articles/golang-v8-isolates/">V8 Isolates for fast JavaScript execution in Go</a></li>
        <li><a href="/articles/make-it-work-make-it-beautiful-make-it-fast/">Make it Work, Make it Beautiful, Make it Fast</a></li>
        <li><a href="/articles/best-tip-the-worklog/">Best tip I received — The worklog</a></li>
        <li><a href="/articles/banana-or-human-marginal-degradation/">Banana or Human, and Marginal Degradation</a></li>
      </ul>
    </section>
  );
};
