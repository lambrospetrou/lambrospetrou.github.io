import Head from "next/head";
import { Layout } from "../../components/layout";

export default function HireIndex() {
  return (
    <Layout>
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

      <header>
        <p>Simplicity. Reliability. Satisfaction. Choose any three. </p>
        <h1>I am expert in website & API development, continuous delivery, and scaling applications.</h1>
      </header>

      <section>
        {/* TODO Add photo. */}
        <p>Hi there 👋 I am Lambros.</p>
        <p>
          For more than a decade, I have been working with distributed systems of all scales.
          <br/>
          I buid websites, implement continuous integration and continuous delivery pipelines for cloud-native applications, and I can help you scale.
        </p>
        <p>
          If you want to get a software job in a Big Tech (FAANG) company, I can help with that too!
        </p>
        <p>
          Are you interested? I can work with you as an independent consultant.
          <br/><br/>
          BOOK A CONSULTATION SESSION or LET'S CHAT ABOUT CONTRACTING FOR A PROJECT
        </p>
      </section>

      <p>Here's what I can do for you 👇</p>

      <section>
        <h3>Websites and APIs 💻</h3>
        <p>Highly dynamic and interactive websites using React, including frameworks like Next.js, Astro, and Eleventy.</p>
        <p>Prefer server-rendered applications, with sprinkles of dynamic JavaScript using libraries like HTMX and Preact islands? Not a problem, I love that too.</p>
        <p>Reliable backend server, or serverless, REST APIs.</p>
        <p>Scale your applications using the right caching, load balancing for high-availability, and smart CDNs.</p>
      </section>

      <section>
        <h3>Continuous Integration and Continuous Deployment (CI/CD) 🚢</h3>
        <p><strong>Deliver value to your customers, safely, reliably, continuously!</strong></p>
        <p>Setup your CI/CD pipeline to automatically test, build, and release your applications.</p>
        <p>Automatic deployment of your software to customers, using feature flags and controlled gradual rollouts.</p>
        <p>Provision cloud-native infrastructure (AWS CDK, Terraform).</p>
      </section>

      <section>
        <h3>Career Mentoring and Job Interviews 🎓</h3>
        <p>Revamp your CV in order to standout in job applications and pass the recruiting filters.</p>
        <p>Advise and guide you through the interview process for tech companies.</p>
        <p>Do 1:1 mock interview sessions for coding and system design interviews.</p>
      </section>

      <section>
        <h3>Technology stack</h3>
        <ul>
          <li>Languages: Go, Java, Kotlin, JavaScript/TypeScript</li>
          <li>Cloud: Amazon Web Services, Cloudflare Workers/Pages</li>
          <li>Infrastructure provisioning: AWS CDK, AWS SAM and CloudFormation, Terraform</li>
          <li>CI/CD: Github, Gitlab CI, AWS CodeBuild/CodeDeploy/CodePipeline</li>
          <li>Observability and Application Performance Monitoring</li>
        </ul>
        <p>Favourite stack: Go or Kotlin, AWS Lambda, Cloudflare Pages</p>
      </section>

      <section>
        <h3>Why you should trust me</h3>

        <p>
          I have been creating websites for more than 15 years, even before being paid for it.
        </p>
        <p>
          I have built dynamic single page applications with highly interactive visualizations using React, rendering flamegraphs with thousands of elements, for Amazon CodeGuru Profiler.
          I led the development of the Amazon LOVEFiLM mobile app using the hybrid cross-platform Ionic framework and AngularJS.
        </p>
        <p>I extensively used Java & Kotlin with the Spring Framework(s) to server-render websites and their corresponding REST APIs for the Amazon retail website.</p>
        <p>I have deep knowledge of the web platform, and I can help you build the website and API your product deserves.</p>

        <p>
          I used Amazon Web Services (AWS) as a customer for years. But, I also experienced it from the inside, where I was part of the team that built and released Amazon CodeGuru Profiler as a public AWS service in 2019.
        </p>
        <p>
          I was the lead engineer for our service architecture ontop of AWS, and implemented core components of our Infrastructure-as-Code automation to achieve fully continuous deployments.
          We required gradual rollouts in waves of multiple regions, multiple staging and production environments, and all the bells and whistles regarding testing, canaries in production, automatic rollbacks, and more.
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

    </Layout>
  );
}
