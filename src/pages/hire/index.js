import Head from "next/head";
import { Layout } from "../../components/layout";

function ConsultingAction() {
  return <div className="cta-container">
    <a className="cta-consult" href="https://cal.com/lambrospetrou/consulting-session-1-hour" target="_blank" rel="noopener noreferrer">
      <span>
        Book consultation session
        <small>1:1 session with me, any topic you want.</small>
      </span>
    </a>
  </div>
}

function InterviewConsultingAction() {
  return <div className="cta-container">
    <a className="cta-interview" href="https://cal.com/lambrospetrou/interview-preparation-1h" target="_blank" rel="noopener noreferrer">
      Book interview preparation session
      <small>1:1 session with me, to prepare you for coding or system design interviews.</small>
    </a>
  </div>
}

export default function HireIndex() {
  return (
    <Layout className="hire-container" wrapInnerSection={false}>
      <Head>
        <link rel="canonical" href="https://www.lambrospetrou.com/hire/" />
        <title>Get expert help by Lambros Petrou</title>
        <meta property="og:title" content="Get expert help by Lambros Petrou" />
        <meta
          property="og:description"
          content="Expert consulting for websites & APIs development, and Big Tech software interview preparation."
        />
        <meta
          name="description"
          content="Expert consulting for websites & APIs development, and Big Tech software interview preparation."
        />
      </Head>

      <header id="hero">
        <h1>Websites & APIs. <wbr/> CI/CD. Cloud.</h1>
        <small id="consulting-badge">Expert Consulting</small>
        {/* <p id="tagline">&#9733; Simple. Reliable. Done. </p> */}
        {/* <p id="tagline">&#9733; Deliver value safely, reliably, continuously.</p> */}
      </header>

      <div id="inner-content" className="inner-section">
        <section>
          {/* <header>
            <p id="tagline">&#9733; Simple. Reliable. Done.</p>
          </header> */}

          <div id="intro">
            <div className="intro-text">
              <p>Hi there 👋 I am Lambros.</p>
              <p>
                I build websites & reliable APIs, implement continuous integration and continuous delivery (CI/CD) pipelines for cloud-native applications, and I can help you scale to millions of users.{" "}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
              </p>
              <p>
                If you want to get a software job in a Big Tech (FAANG) company, I can help you prepare for that too!{" "}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
              </p>
              <p>
                <strong>Are you already interested?</strong>
              </p>
            </div>
            <div className="profile-pic">
              <img src="/s/images/profile-pic.opt.jpg" alt="Lambros Petrou profile picture"/>
            </div>
          </div>
          <div>
            <ConsultingAction />
            <InterviewConsultingAction />
          </div>
        </section>

        <p>Here's what I can do for you 👇</p>

        <div className="stacked">

        <section id="websites">
          <h3>Websites & APIs</h3>
          <ul>
            <li>Highly dynamic and interactive websites using React, including frameworks like Next.js, Astro, and Eleventy.</li>
            <li>Prefer server-rendered applications, with sprinkles of dynamic JavaScript using libraries like HTMX and Preact islands? Not a problem, I love that too.</li>
            <li>Reliable and scalable backend server APIs.</li>
            <li>Scale your web applications using robust caching, load balancing for high-availability, and smart CDNs.</li>
          </ul>
        </section>

        <section id="cicd">
          <h3>CI/CD and Cloud Infrastructure</h3>
          <ul>
            <li>Setup your CI/CD pipeline to automatically test and build your applications on every pull-request.</li>
            <li>Automatic continuous deployment of your software to customers using feature flags, for controlled gradual rollouts.</li>
            <li>Infrastructure-as-Code for provision cloud resources (AWS CDK, AWS SAM, Terraform).</li>
            <li>Integrate with observability & APM tools, and optimize your applications.</li>
          </ul>
        </section>

        </div>

        <section id="career">
          <h3>Career Mentoring and Job Interviews</h3>
          <ul>
            <li>Revamp your CV in order to standout in job applications and pass the recruiting filters.</li>
            <li>Advise and guide you through the interview process for tech companies.</li>
            <li>Do 1:1 mock interview sessions for coding and system design interviews.</li>
          </ul>
          <p>Read <a href="/articles/big-tech-software-interviews/?ref=lp-hire" title="Article for How to pass the interview for software engineering roles in Big Tech">How to pass the interview for software engineering roles in Big Tech</a> for what to expect during your interview.</p>
        </section>

        <InterviewConsultingAction />

        <section id="tech">
          <h3>★ Technology stack ★</h3>
          <p>
            I have written production code in a lot of programming languages, and used most modern frameworks.
            The following is what I regularly use and can provide the most value:
          </p>
          <ul>
            <li>Languages: Go, Java, Kotlin, JavaScript/TypeScript</li>
            <li>Cloud: Amazon Web Services, Cloudflare Workers/Pages</li>
            <li>Infrastructure provisioning: AWS CDK, AWS SAM and CloudFormation, Terraform</li>
            <li>CI/CD: Github, Gitlab CI, AWS CodeBuild/CodeDeploy/CodePipeline</li>
            <li>Observability and Application Performance Monitoring: AWS CloudWatch, Datadog</li>
          </ul>
          <p>Favourite stack: Go or Kotlin, AWS Lambda, Cloudflare Pages</p>
        </section>

        <section id="why-trust">
          <h3>
          <svg className="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg>
            Why you should trust me... And work with me.
          </h3>

          <p>
            I have been creating websites for more than 10 years, even before being paid for it.
          </p>
          <p>
            I have built dynamic single page applications with highly interactive visualizations using React, rendering flamegraphs with thousands of elements, for Amazon CodeGuru Profiler.
            I led the development of the Amazon LOVEFiLM mobile app using the hybrid cross-platform Ionic framework and AngularJS.
          </p>
          <p>I extensively used Java & Kotlin (Spring, Http4k) to server-render websites and their corresponding REST APIs for the Amazon retail website.</p>
          
          <blockquote>
          <p>I have deep knowledge of the web platform, and I can help you build the website and API your product deserves.</p>
        </blockquote>

          <p>
            I used Amazon Web Services (AWS) as a customer for years. But, I also experienced it from the inside. I was part of the team that built and released Amazon CodeGuru Profiler as a public AWS service in 2019.
          </p>
          <p>
            I was the lead engineer for our service architecture ontop of AWS, and implemented core components of our Infrastructure-as-Code automation to achieve fully continuous deployments.
            Our final pipeline included gradual rollouts in waves of multiple regions, multiple staging and production environments, and all the bells and whistles regarding testing, canaries in production, automatic rollbacks, and more.
          </p>
          
          <p>
            During my time in the WhatsApp Dev Infra team, I contributed to the continuous integration system for WhatsApp Server.
            Most notably, we built FAUSTA, a fully automated system able to detect reliability, privacy, and performance regressions of a code change (pull-request).
          </p>

          <p>
            Throughout my career, I always gravitated towards working with software release infrastructure.
            I also love the web platform; creating websites and APIs, and scaling them to millions of users.
          </p>
          <p><strong>★ Let me help you deliver value to your own customers safely, reliably, continuously. ★</strong></p>
        </section>

        <ConsultingAction />

      </div>

    </Layout>
  );
}
