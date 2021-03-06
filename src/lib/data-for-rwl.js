// Put new content to the top of the array!
// All fields are mandatory.
// interface Entry {
//   type: article | video | audio = article
//   url: string,
//   title?: string,
//   author?: string,
//   tags?: string[]
//   dateListed: ISO8601 (used for the RSS)
// };
const DataList = [
  {
    url: "https://www.youtube.com/watch?v=uH-ffKIgb38",
    title: "The Value of Stories in Business | Aswath Damodaran | Talks at Google",
    author: "Aswath Damodaran",
    dateListed: "2021-06-09T15:00:00.000Z",
    type: "video"
  },
  {
    url: "https://www.youtube.com/watch?v=PX5-XyBNi00",
    title: "Warren Buffet's Life Advice Will Change Your Future",
    author: "Warren Buffet",
    dateListed: "2021-06-04T11:00:00.000Z",
    type: "video"
  },
  {
    url: "https://www.youtube.com/watch?v=Z5chrxMuBoo",
    title: "Valuation in Four Lessons | Aswath Damodaran | Talks at Google",
    author: "Aswath Damodaran",
    dateListed: "2021-06-03T22:00:00.000Z",
    type: "video",
    tags: ["favourite"]
  },
  {
    url: "https://arachnoid.com/equities_myths/",
    title: "Equities Myths - Things you should know about investing",
    author: "Paul Lutus",
    dateListed: "2021-05-28T23:00:00.000Z"
  },
  {
    url: "https://nav.al/rich",
    title: "How to Get Rich",
    author: "Naval",
    dateListed: "2021-05-22T21:00:00.000Z",
    tags: ["favourite"]
  },
  {
    url: "https://www.allencheng.com/boundaries-book-summary-henry-cloud-john-townsend/",
    title: "Boundaries Book Summary, by Henry Cloud, John Townsend",
    author: "Allen Cheng",
    dateListed: "2021-05-11T22:00:00.000Z"
  },
  {
    url: "https://cacm.acm.org/magazines/2021/5/252179-what-serverless-computing-is-and-should-become/fulltext",
    title: "What Serverless Computing Is and Should Become: The Next Phase of Cloud Computing",
    author: "Johann Schleier-Smith, Vikram Sreekanti, Anurag Khandelwal, Joao Carreira, Neeraja J. Yadwadkar, Raluca Ada Popa, Joseph E. Gonzalez, Ion Stoica, David A. Patterson",
    dateListed: "2021-05-07T18:00:00.000Z"
  },
  {
    url: "https://shinesolutions.com/2018/01/08/falsehoods-programmers-believe-about-names-with-examples/",
    title: "Falsehoods Programmers Believe About Names – With Examples",
    author: "Tony Rogers (shine solutions group)",
    dateListed: "2021-04-30T10:00:00.000Z"
  },
  {
    url: "https://kk.org/thetechnium/1000-true-fans/",
    title: "1,000 True Fans",
    author: "Kevin Kelly",
    dateListed: "2021-04-27T23:00:00.000Z"
  },
  {
    url: "https://kk.org/thetechnium/99-additional-bits-of-unsolicited-advice/",
    title: "99 Additional Bits of Unsolicited Advice",
    author: "Kevin Kelly",
    dateListed: "2021-04-26T21:00:00.000Z"
  },
  {
    url: "https://kk.org/thetechnium/68-bits-of-unsolicited-advice/",
    title: "68 Bits of Unsolicited Advice",
    author: "Kevin Kelly",
    dateListed: "2021-04-26T13:00:00.000Z",
    tags: ["favourite"]
  },
  {
    url: "https://m.signalvnoise.com/reconsider/",
    title: "RECONSIDER",
    author: "David Heinemeier Hansson - DHH",
    dateListed: "2021-04-23T11:00:00.000Z",
    tags: ["favourite"]
  },
  {
    url: "https://blog.burntsushi.net/transducers/",
    title: "Index 1,600,000,000 Keys with Automata and Rust (fst)",
    author: "Andrew Gallant",
    dateListed: "2021-04-18T21:00:00.000Z",
    tags: ["favourite"]
  },
  {
    url: "https://gregoryszorc.com/blog/2021/04/13/rust-is-for-professionals/",
    title: "Rust is for Professionals",
    author: "Gregory Szorc",
    dateListed: "2021-04-14T12:00:00.000Z",
    tags: ["favourite"]
  },
  {
    url: "https://www.economicliberties.us/our-work/new-money-trust/",
    title: "The New Money Trust: How Large Money Managers Control Our Economy and What We Can Do About It",
    author: "Graham Steele",
    dateListed: "2021-04-05T23:00:00.000Z"
  },
  {
    url: "https://www.bankeronwheels.com/how-to-take-advantage-of-a-recession/",
    title: "Epic Stock Market Crashes - Guide on how to take advantage of the next recession",
    author: "Raph Antoine aka Banker on Wheels",
    dateListed: "2021-04-04T22:00:00.000Z"
  },
  {
    url: "https://martin.baillie.id/wrote/gotchas-in-the-go-network-packages-defaults/",
    title: "Gotchas in the Go Network Packages Defaults",
    author: "Martin Baillie",
    dateListed: "2021-03-29T23:00:00.000Z"
  },
  {
    url: "https://golang.org/doc/effective_go",
    title: "Effective Go",
    author: "Go Team",
    dateListed: "2021-03-29T23:00:00.000Z"
  },
  {
    url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/",
    title: "Timeouts, retries, and backoff with jitter",
    author: "Marc Brooker",
    tags: ["favourite"],
    dateListed: "2021-03-21T15:00:00.000Z"
  },
  {
    url: "https://aws.amazon.com/builders-library/using-load-shedding-to-avoid-overload/",
    title: "Using load shedding to avoid overload",
    author: "David Yanacek",
    tags: ["favourite"],
    dateListed: "2021-03-21T15:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=5zXAHh5tJqQ",
    title: "GopherCon 2018: Rethinking Classical Concurrency Patterns",
    author: "Bryan C. Mills",
    type: "video",
    dateListed: "2021-03-19T19:00:00.000Z"
  },
  {
    url: "https://encore.dev/blog/advanced-go-concurrency",
    title: "Advanced Go Concurrency",
    author: "André Eriksson",
    dateListed: "2021-03-19T16:00:00.000Z"
  },
  {
    url: "https://open.spotify.com/episode/0jU0dAZORvCB9zbTBz4keH?si=aniMpCV_SPyd-iRfM56voQ",
    title: "Amazon Narratives: Memos, Working Backwards from Release, More (a16z Podcast)",
    author: "Colin Bryar, Bill Carr, Sonal Chokshi",
    type: "audio",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://bost.ocks.org/mike/algorithms/",
    title: "Visualizing Algorithms",
    author: "Mike Bostock",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://world.hey.com/jason/remote-work-is-not-local-work-at-a-distance-94602802",
    title: "Remote work is not local work at a distance",
    author: "Jason Fried",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://web.dev/streams/",
    title: "Streams—The definitive guide",
    author: "Thomas Steiner",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://aws.amazon.com/builders-library/reliability-and-constant-work/",
    title: "Reliability, constant work, and a good cup of coffee",
    author: "Colm MacCárthaigh",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=Mj5P47F6nJg",
    title: "Structured concurrency (Kotlin)",
    author: "Roman Elizarov",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=M85UvH0TRPc",
    title: "The Internet's Own Boy: The Story of Aaron Swartz",
    author: "Brian Knappenberger - Luminant Media",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.theatlantic.com/technology/archive/2017/09/saving-the-world-from-code/540393/",
    title: "The Coming Software Apocalypse",
    author: "James Somers",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://physiqonomics.com/fat-loss/",
    title: "The Best Fat Loss Article on the Motherfuckin’ Internet",
    author: "Aadam",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.hillelwayne.com/post/crossover-project/are-we-really-engineers/",
    title: "ARE WE REALLY ENGINEERS?",
    author: "Hillel Wayne",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://play.kotlinlang.org/byExample/overview",
    title: "Learn Kotlin by Example",
    author: "JetBrains",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://jvns.ca/blog/things-your-manager-might-not-know/",
    title: "Things your manager might not know",
    author: "Julia Evans",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://aws.amazon.com/builders-library/automating-safe-hands-off-deployments/",
    title: "Automating safe, hands-off deployments",
    author: "Clare Liguori",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://aws.amazon.com/builders-library/workload-isolation-using-shuffle-sharding/",
    title: "Workload isolation using shuffle-sharding",
    author: "Colm MacCárthaigh",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://jvns.ca/blog/2021/01/04/docker-compose-is-nice/",
    title: "Docker Compose: a nice way to set up a dev environment",
    author: "Julia Evans",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://docs.google.com/document/d/199PqyG3UsyXlwieHaqbGiWVa8eMWi8zzAn0YfcApr8Q/view",
    title: "My Philosophy on Alerting (SRE)",
    author: "Rob Ewaschuk",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://medium.com/@mrabkin/the-art-of-the-awkward-1-1-f4e1dcbd1c5c",
    title: "The Art of the Awkward 1:1",
    author: "Mark Rabkin",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://nickcraver.com/blog/2016/02/03/stack-overflow-a-technical-deconstruction/",
    title: "Stack Overflow: A Technical Deconstruction",
    author: "Nick Craver",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://blog.samaltman.com/the-days-are-long-but-the-decades-are-short",
    title: "The days are long but the decades are short",
    author: "Sam Altman",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=C27RVio2rOs",
    title: "Building Product",
    author: "Michael Seibel",
    type: "video",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "http://paulgraham.com/avg.html",
    title: "Beating the Averages",
    author: "Paul Graham",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "http://paulgraham.com/ds.html",
    title: "Do things that don't scale",
    author: "Paul Graham",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.mixcloud.com/TheJoeRoganExperience/1342-john-carmack/",
    title: "Joe Rogan Experience #1342 - John Carmack",
    author: "Joe Rogan, John Carmack",
    type: "audio",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://dave.cheney.net/2020/02/23/the-zen-of-go",
    title: "The Zen of Go",
    author: "Dave Cheney",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://crawshaw.io/blog/one-process-programming-notes",
    title: "One process programming notes (with Go and SQLite)",
    author: "David Crawshaw",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "http://www.paulgraham.com/makersschedule.html",
    title: "Maker's Schedule, Manager's Schedule",
    author: "Paul Graham",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://ivoanjo.me/blog/2018/04/08/my-thoughts-on-and-how-i-approach-code-reviews/",
    title: "my thoughts on, and how i approach code reviews",
    author: "Ivo Anjo",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://about.gitlab.com/company/culture/all-remote/asynchronous/",
    title: "Embracing asynchronous communication",
    author: "Gitlab",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.kalzumeus.com/2014/04/03/fantasy-tarsnap/",
    title: "What I Would Do If I Ran Tarsnap",
    author: "Patrick McKenzie",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.lastweekinaws.com/blog/multi-cloud-is-the-worst-practice/",
    title: "Multi-Cloud is the Worst Practice",
    author: "Corey Quinn",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://m.signalvnoise.com/why-we-choose-profit/",
    title: "Why we choose profit",
    author: "Jason Fried",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.zainrizvi.io/blog/the-impostors-advantage/",
    title: "How I learned to turn Impostor Syndrome into an Advantage - The Impostor's Advantage",
    author: "Zain Rizvi",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://aws.amazon.com/builders-library/avoiding-overload-in-distributed-systems-by-putting-the-smaller-service-in-control/",
    title: "Avoiding overload in distributed systems by putting the smaller service in control",
    author: "Joe Magerramov",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://vicki.substack.com/p/google-drive-is-production",
    title: "Google Drive is production - Look at me, I'm the source of truth now",
    author: "Vicki Boykis",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://ferd.ca/ten-years-of-erlang.html",
    title: "Ten Years of Erlang",
    author: "Fred Hebert",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://ferd.ca/awk-in-20-minutes.html",
    title: "Awk in 20 Minutes",
    author: "Fred Hebert",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=vnEf8z1aZns",
    title: "Eye Opening Speeches (compilation)",
    author: "Denzel Washington",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.newyorker.com/magazine/2018/12/10/the-friendship-that-made-google-huge",
    title: "The Friendship That Made Google Huge",
    author: "James Somers",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=RqubKSF3wig",
    title: "SQLite and Go",
    author: "David Crawshaw",
    type: "video",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://addyosmani.com/blog/profiling-react-js/",
    title: "Profiling React.js Performance",
    author: "Addy Osmani",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=lJ8ydIuPFeU",
    title: "How NOT to Measure Latency",
    author: "Gil Tene",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/",
    title: "How to write the perfect pull request",
    author: "Keavy McMinn",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://css-tricks.com/the-art-of-comments/",
    title: "The Art of Comments",
    author: "Sarah Drasner",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.philipotoole.com/what-i-learned-from-programming-a-database/",
    title: "WHAT I LEARNED FROM PROGRAMMING DATABASES",
    author: "Philip O'Toole",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=Unzc731iCUY",
    title: "MIT: How To Speak",
    author: "Patrick Winston",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=gdSlcxxYAA8",
    title: "The Art of Code",
    author: "Dylan Beattie",
    type: "video",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://waitbutwhy.com/2015/12/the-tail-end.html",
    title: "The Tail End",
    author: "Tim Urban",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://howhttps.works/",
    title: "HOW HTTPS WORKS",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://aashni.me/blog/hype-yourself-youre-worth-it/",
    title: "Hype Yourself! You're Worth It!",
    author: "Aashni Shah",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.linkedin.com/pulse/toxic-work-culture-forcing-high-performing-people-quit-tim-denning/",
    title: "A Toxic Work Culture Is Forcing High-Performing People to Quit",
    author: "Tim Denning",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=JvBT4XBdoUE",
    title: "GOTO 2019 • The Soul of Erlang and Elixir",
    author: "Saša Jurić",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://brooker.co.za/blog/2019/04/03/learning.html",
    title: "Learning to build distributed systems",
    author: "Marc Brooker",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3",
    title: "Twitter Lite and High Performance React Progressive Web Apps at Scale",
    author: "Paul Armstrong",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://medium.com/s/company-culture/your-companys-culture-is-who-you-hire-fire-and-promote-c69f84902983",
    title: "Your Company Culture is Who You Hire, Fire, and Promote",
    author: "Cameron Sepah",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=kGlVcSMgtV4",
    title: "Simple Made Easy",
    author: "Rich Hickey",
    type: "video",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=YR5WdGrpoug",
    title: "Maybe Not",
    author: "Rich Hickey",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://danluu.com/startup-tradeoffs/",
    title: "Big companies v. startups",
    author: "Dan Luu",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.kalzumeus.com/2012/01/23/salary-negotiation/",
    title: "Salary Negotiation: Make More Money, Be More Valued",
    author: "Patrick McKenzie",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/",
    title: "Don't Call Yourself A Programmer, And Other Career Advice",
    author: "Patrick McKenzie",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://mcfunley.com/choose-boring-technology",
    title: "Choose Boring Technology",
    author: "Dan McKinley",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://v8.dev/blog/cost-of-javascript-2019",
    title: "The Cost Of JavaScript In 2019",
    author: "Addy Osmani",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4",
    title: "The Cost Of JavaScript In 2018",
    author: "Addy Osmani",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
    title: "The Clean Architecture",
    author: "Robert C. Martin (Uncle Bob)",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=pO4_Wlq8JeI",
    title: "Solid Ground",
    author: "Saša Jurić",
    type: "video",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=7lmCu8wz8ro",
    title: "What Does It Take To Be An Expert At Python?",
    author: "James Powell",
    type: "video",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://peter.bourgon.org/go-for-industrial-programming/",
    title: "Go for Industrial Programming",
    author: "Peter Bourgon",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://zachholman.com/talk/utc-is-enough-for-everyone-right",
    title: "UTC is enough for everyone ...right?",
    author: "Zach Holman",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://jack-vanlightly.com/blog/2017/12/4/rabbitmq-vs-kafka-part-1-messaging-topologies",
    title: "RabbitMQ vs Kafka Part 1 - Two Different Takes on Messaging",
    author: "Jack Vanlighty",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=lKXe3HUG2l4",
    title: "The Mess We're In",
    author: "Joe Armstrong",
    type: "video",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://practicaltypography.com/why-racket-why-lisp.html",
    title: "WHY RACKET? WHY LISP?",
    author: "Matthew Butterick",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://tomjoro.github.io/2017-01-31-world-changed/",
    title: "Elixir - Erlang didn't change, the world did",
    author: "Thomas O'Rourke",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://martin.kleppmann.com/2011/03/07/accounting-for-computer-scientists.html",
    title: "Accounting for Computer Scientists",
    author: "Martin Kleppmann",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying",
    title: "The Log: What every software engineer should know about real-time data's unifying abstraction",
    author: "Jay Kreps",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://blog.acolyer.org/2017/08/22/javascript-for-extending-low-latency-in-memory-key-value-stores/",
    title: "JavaScript for extending low-latency in-memory key-value stores",
    author: "Adrian Colyer",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=_Pwlvy3zz9M",
    title: "Hitchhiker's Tour of the BEAM",
    author: "Robert Virding",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=5Zg-C8AAIGg",
    title: "The beauty of data visualization (TED-ed)",
    author: "David McCandless",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=uBjoTxosSys",
    title: "Go Tooling in Action",
    author: "Francesc Campoy",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://techcrunch.com/2017/05/14/why-amazon-is-eating-the-world/",
    title: "Why Amazon is eating the world",
    author: "Zack Kanter",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://vimeo.com/97349221",
    title: "Better Software—No Matter What: The Most Important Design Guideline",
    author: "Scott Meyers",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=itKFrXghGuA",
    title: "Computing: The first 100 years (Full Stack Fest 2016)",
    author: "Joe Armstrong",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=YaUPdgtUYko",
    title: "Stanford Seminar - Faults, Scaling, and Erlang Concurrency",
    author: "Joe Armstrong",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=CBYhVcO4WgI&list=PL5q_lef6zVkaTY_cT1k7qFNF2TidHCe-1",
    title: "Lecture 1 - How to Start a Startup",
    author: "Sam Altman, Dustin Moskovitz",
    type: "video",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#---0-78.c41sptspc",
    title: "How it feels to learn JavaScript in 2016",
    author: "Jose Aguinaga",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://fsharpforfunandprofit.com/posts/ten-reasons-not-to-use-a-functional-programming-language/",
    title: "Ten reasons not to use a statically typed functional programming language",
    author: "Scott Wlaschin",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://blog.codinghorror.com/recommended-reading-for-developers/",
    title: "Recommended Reading for Developers",
    author: "Jeff Atwood",
    tags: ["favourite"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.davidhaney.io/npm-left-pad-have-we-forgotten-how-to-program/",
    title: "NPM & left-pad: Have We Forgotten How To Program?",
    author: "David Haney",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html",
    title: "Just Say No to More End-to-End Tests",
    author: "Mike Wacker",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=PAAkCSZUG1c",
    title: "Go Proverbs",
    author: "Rob Pike",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.smashingmagazine.com/2015/10/space-yourself/",
    title: "Space Yourself",
    author: "Marcin Wichary",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://markmanson.net/not-giving-a-fuck",
    title: "The Subtle Art of Not Giving a Fuck",
    author: "Mark Manson",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "http://norvig.com/21-days.html",
    title: "Teach Yourself Programming in Ten Years",
    author: "Peter Norvig",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.bloomberg.com/graphics/2015-paul-ford-what-is-code/",
    title: "WHAT IS CODE?",
    author: "Paul Ford",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://bjk5.com/post/44698559168/breaking-down-amazons-mega-dropdown",
    title: "Breaking down Amazon’s mega dropdown",
    author: "Ben Kamens",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.the-paper-trail.org/post/2014-08-09-distributed-systems-theory-for-the-distributed-systems-engineer/",
    title: "Distributed systems theory for the distributed systems engineer",
    author: "Henry Robinson",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/lecture-videos/",
    title: "MIT: Introduction to Algorithms",
    author: "Prof. Erik Demaine, Prof. Srini Devadas",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://martinfowler.com/articles/continuousIntegration.html",
    title: "Continuous Integration",
    author: "Martin Fowler",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://www.youtube.com/watch?v=HHjgK6p4nrw",
    title: "The Top 10 Mistakes of Entrepreneurs",
    author: "Guy Kawasaki",
    type: "video",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://medium.com/always-be-coding/abc-always-be-coding-d5f8051afce2",
    title: "ABC: Always Be Coding - How to Land an Engineering Job",
    author: "David Byttow",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://highlyscalable.wordpress.com/2012/02/01/mapreduce-patterns/",
    title: "MAPREDUCE PATTERNS, ALGORITHMS, AND USE CASES",
    author: "Ilya Katsov",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "http://matt.might.net/articles/phd-school-in-pictures/",
    title: "The illustrated guide to a Ph.D.",
    author: "Matt Might",
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    url: "https://sealedabstract.com/rants/why-mobile-web-apps-are-slow/",
    title: "Why mobile web apps are slow",
    author: "Drew Crawford",
    tags: ["software"],
    dateListed: "2021-03-14T11:00:00.000Z"
  },
  {
    title: "Things Every Programmer Should Know",
    url: "https://www.javacodegeeks.com/2010/12/things-every-programmer-should-know.html",
    author: "Byron Kiourtzoglou",
    tags: ["software"],
    dateListed: "2021-03-14T11:00:00.000Z"
  }
];

function getHostname(urlStr) {
  try {
    return new URL(urlStr).hostname;
  } catch (e) {
    // IE
    return "";
  }
}

function getItemId({ url, title, author }) {
  const hostname = getHostname(url);
  return `${encodeURIComponent(hostname)}-${encodeURIComponent(title)}-${encodeURIComponent(author)}`.toLowerCase();
}

module.exports = {
  getHostname,
  getItemId,
  DataList
};
