export const FavouriteArticlesList = ({
  heading = "Read some of my favourite articles"
}) => {
  return (
    <section>
      <h4>{heading}</h4>
      <ul>
        <li><a href="https://www.lambrospetrou.com/articles/best-tip-the-worklog/">Best tip I received — The worklog</a></li>
        <li><a href="https://www.lambrospetrou.com/articles/amazon-leadership-principles/">Amazon Leadership Principles — Choose 3</a></li>
        <li><a href="https://www.lambrospetrou.com/articles/banana-or-human-marginal-degradation/">Banana or Human, and Marginal Degradation</a></li>
        <li><a href="https://www.lambrospetrou.com/articles/encrypt-files-with-password-linux/">Encrypt files with password on Linux</a></li>
      </ul>
    </section>
  );
};
