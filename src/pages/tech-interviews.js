import Head from "next/head";
import { Layout } from "../components/layout";

export function InterviewConsultingAction() {
  return <div className="consulting-cta-container">
    {/* <a className="cta-interview" href="https://cal.com/lambrospetrou/interview-preparation-1h" target="_blank" rel="noopener noreferrer"> */}
    <a className="cta-interview" href="https://go.lambros.dev/book-interview-prep" target="_blank" rel="noopener">
      Book interview preparation session
      <small>1:1 mock interview (coding or system design)</small>
    </a>
  </div>
}

export default function Index() {
  return (
    <Layout className="tech-interviews-container" wrapInnerSection={false}>
      <Head>
        <link rel="canonical" href="https://www.lambrospetrou.com/tech-interviews/" />
        <title>Tech software engineering interview preparation by Lambros Petrou</title>
        <meta property="og:title" content="Tech software engineering interview preparation by Lambros Petrou" />
        <meta
          property="og:description"
          content="Get practical help preparing for Big Tech software interviews, from junior to Principal roles."
        />
        <meta
          name="description"
          content="Get practical help preparing for Big Tech software interviews, from junior to Principal roles."
        />
      </Head>

      <header id="hero">
        <h1>Tech Software Interviews.</h1>
        <small id="consulting-badge">Practical Help</small>
      </header>

      <div id="inner-content" className="inner-section">
        <section>
          <div id="intro">
            <div className="intro-text">
              <p>Hi there 👋 I am Lambros.</p>
              <p>
                I have been a software engineer in tech for more than a decade. I started off as a graduate software engineer at Amazon, and I am now a Principal Engineer at Cloudflare.{" "}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
              </p>
              <p>
                I have gone through tens of interviews myself as an interviewee, and have completed more than a hundred interviews as an interviewer during my time at Amazon/AWS, Meta, and Datadog.
              </p>
              <p>
                You want to get a software job in a Big Tech company, and I can help you prepare!{" "}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
              </p>
              <p>
                <strong>Already interested?</strong>
              </p>
            </div>
            <div className="profile-pic">
              <img src="/s/images/profile-pic.opt.jpg" alt="Lambros Petrou profile picture"/>
            </div>
          </div>
          <div>
            <InterviewConsultingAction />
          </div>
        </section>
      </div>

      <hr/>

      <div className="inner-section">
        <section id="career">
          <h3>Career Mentoring and Job Interviews</h3>
          <ul>
            <li>I will advise and guide you through the interview process of tech companies.</li>
            <li>You will revamp your CV to standout in job applications and pass the recruiting filters.</li>
            <li>We will do 1:1 mock interview sessions for coding and system design interviews.</li>
          </ul>
          {/* <p>Read <a href="/articles/big-tech-software-interviews/?ref=lpcom-consulting" title="Article for How to pass the interview for software engineering roles in Big Tech">How to pass the interview for software engineering roles in Big Tech</a> for what to expect during your interview.</p> */}
        </section>
  
        <section id="tech-jobs-article-ref">
          <p>Back in 2023, I wrote a very detailed article titled <a href="/articles/big-tech-software-interviews/?ref=lpcom-tech-interviews-page" title="Article How to pass the interview for software engineering roles in Big Tech">"How to pass the interview for software engineering roles in Big Tech"</a> for what to expect during your interview, how to prepare, and how to tackle the interviews themselves.</p>
          <p>I received a lot of positive feedback for this article, from friends, colleagues, and strangers that stumbled upon my article when searching for relevant terms.</p>
          <p>The most gratifying moments were when HR folks reached out from numerous teams asking if they could share my article as part of their own candidates preparation material. This still feels awesome whenever it happens 💪🏼🥳</p>
        </section>
      </div>

      <div className="inner-section" style={{maxWidth:"1280px", marginTop: "64px"}}>
        <section id="social-feedback">
          <h3 style={{textAlign: "center"}}>
            People love my advise and tips!
          </h3>
          <p>
            <img src="/s/images/tech-interviews/Screenshot 2023-10-06 at 17.13.14.png" title="HR recruiter asking permission for sharing my tech interview article with their candidates" alt="HR recruiter asking permission for sharing my tech interview article with their candidates" />
          </p>
          <p>
            <img src="/s/images/tech-interviews/Screenshot 2023-10-06 at 17.13.42.png" title="HR recruiter asking permission for sharing my tech interview article with their candidates" alt="HR recruiter asking permission for sharing my tech interview article with their candidates" />
          </p>
          <p>
            <img src="/s/images/tech-interviews/Screenshot 2024-05-21 at 23.01.05.png" title="HR recruiter asking permission for sharing my tech interview article with their candidates" alt="HR recruiter asking permission for sharing my tech interview article with their candidates" />
          </p>
        </section>
      </div>

      <div className="inner-section">

        <hr/>

        <InterviewConsultingAction />

        <section id="why-trust" style={{marginBottom: "64px"}}>
          <h3>
            {/* <svg className="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg> */}
            Why you can trust me.
          </h3>

          <p>
            I have been an interviewee for more than a decade, an interviewer for over a hundred interviews for software engineering positions, and I grew myself from junior Software Development Engineer to Principal Engineer.
          </p>
          <p>
            After passing and failing many interviews, and conducting interviews for the <strong>coding</strong> and <strong>system design</strong> competencies, I now know where to focus during preparation, what's important during the interview itself, and also how to effectively communicate with the companies after the interview completes.
          </p>

          <p>
            I have worked at Amazon/AWS, Meta & WhatsApp, Datadog, and Cloudflare.
          </p>
          <p>
            Having worked at several Big Tech companies I know exactly what the <em>"checklist"</em> is, what your interviewers will be looking for, and what you should focus on.
          </p>

          <p><strong>★ Let me help you prepare, pass the interview, and negotiate a great offer. ★</strong></p>
        </section>
      </div>

    </Layout>
  );
}
