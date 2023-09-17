import Head from "next/head";
import { Layout } from "../../components/layout";

function HireMeActions() {
  return <div className="cta-container">
    <button className="cta-consult">
      Book consultation session
      <small>1:1 session with me, any topic you want.</small>
    </button>
    <button className="cta-project">
      Request project contract
      <small>Fixed-duration contracting opportunities.</small>
    </button>
  </div>
}

export default function HireIndex() {
  return (
    <Layout className="hire-container">
      <Head>
        <link rel="canonical" href="https://www.lambrospetrou.com/hire/" />
        <title>Get expert help by Lambros Petrou</title>
        <meta property="og:title" content="Get expert help by Lambros Petrou" />
        <meta
          property="og:description"
          content="Get expert help by Lambros Petrou in domains. I can help with backend, API, and website development, AWS infrastructure, and helping you ace your software interviews."
        />
        <meta
          name="description"
          content="Get expert help by Lambros Petrou in domains. I can help with backend, API, and website development, AWS infrastructure, and helping you ace your software interviews."
        />
      </Head>

      <section>
        <header id="hero">
          <h1>I am an expert in website & API development, continuous delivery, and scaling server applications.</h1>
          <p id="tagline">&#9733; Simple. Reliable. Done.</p>
          {/* <p id="tagline">&#9733; Deliver value safely, reliably, continuously.</p> */}
        </header>
        <div id="intro">
          <div className="intro-text">
            <p>Hi there 👋 I am Lambros.</p>
            <p>
              I build websites & APIs, implement continuous integration and continuous delivery (CI/CD) pipelines for cloud-native applications, and I can help you scale to millions of users.
            </p>
            <p>
              If you want to get a software job in a Big Tech (FAANG) company, I can help you prepare for that too!
            </p>
            <p>
              <strong>Are you interested?</strong>
            </p>
          </div>
          <div className="profile-pic">
            <img src="/s/images/profile-pic.opt.jpg" alt="Lambros Petrou profile picture"/>
          </div>
        </div>
        <div>
          <HireMeActions />
        </div>
      </section>

      <p>Here's what I can do for you 👇</p>

      <div className="stacked">

      <section id="websites">
        <h3>Websites and APIs</h3>
        <ul>
          <li>Highly dynamic and interactive websites using React, including frameworks like Next.js, Astro, and Eleventy.</li>
          <li>Prefer server-rendered applications, with sprinkles of dynamic JavaScript using libraries like HTMX and Preact islands? Not a problem, I love that too.</li>
          <li>Reliable backend server, or serverless, REST APIs.</li>
          <li>Scale your applications using the right caching, load balancing for high-availability, and smart CDNs.</li>
        </ul>
      </section>

      <section id="cicd">
        <h3>CI/CD</h3>
        <ul>
          <li>Setup your CI/CD pipeline to automatically test and build your applications on every pull-request.</li>
          <li>Automatic continuous deployment of your software to customers using feature flags, controlled gradual rollouts, and optional automatic rollbacks.</li>
          <li>Infrastructure-as-Code for provision cloud resources (AWS CDK, AWS SAM, Terraform).</li>
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
      </section>

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

      <HireMeActions />

      <section id="why-trust">
        <h3>Why you should trust me... And hire me!</h3>

        <p>
          I have been creating websites for more than 10 years, even before being paid for it.
        </p>
        <p>
          I have built dynamic single page applications with highly interactive visualizations using React, rendering flamegraphs with thousands of elements, for Amazon CodeGuru Profiler.
          I led the development of the Amazon LOVEFiLM mobile app using the hybrid cross-platform Ionic framework and AngularJS.
        </p>
        <p>I extensively used Java & Kotlin (Spring, Http4k) to server-render websites and their corresponding REST APIs for the Amazon retail website.</p>
        <p>I have deep knowledge of the web platform, and I can help you build the website and API your product deserves.</p>

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
          I also love the web platform, creating websites and APIs, and scaling them to millions of users.
        </p>
        <p><strong>I want to help you deliver value to your own customers safely, reliably, continuously.</strong></p>
      </section>

      <HireMeActions />

    </Layout>
  );
}
