export const InlineSignup = () => {
  return (
    <div className="newsletter-signup">
      <header>
        <h3>Subscribe to my newsletter</h3>
        <p>At most one email per month with all my new articles.</p>
      </header>
      <form
        action="https://app.convertkit.com/forms/1379666/subscriptions"
        method="post" data-sv-form="1379666" data-uid="3bbee06cd4" data-version="5">
        {/* <input name="first_name" placeholder="Your name (optional)" type="text"/> */}
        <input name="email_address" placeholder="Your email address" type="email" required aria-required/>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
