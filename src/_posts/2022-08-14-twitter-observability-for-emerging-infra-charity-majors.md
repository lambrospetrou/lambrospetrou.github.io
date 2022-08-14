---
title: "Twitter 📝 Observability for emerging infra: Charity Majors"
description: "My notes on the talk Observability for emerging infra by Charity Majors as posted in my Twitter."
---

Check the original Twitter thread at [@lambrospetrou/status/1558819676439945216](https://twitter.com/LambrosPetrou/status/1558819676439945216).

---

<iframe class="centered" width="560" height="315" src="https://www.youtube.com/embed/fOdtgHu_KeA" title="Observability for emerging infra: Charity Majors YouTube video player" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Just watched the "Observability for emerging infra" talk by @mipsytipsy. Even though I am a big proponent for testing before production, I do agree with all the points raised!

My favourite points raised 👇

1/ Testing is not exclusive to either staging or production. You can, and should, test in both.

2/ Shipping to production is not a flip switch that goes from 0 to 100 once the code lands. There can be commit reverts, hotfixes/patches, multiple versions running, automatic rollbacks. Our job is not done just because the code is shipped.

3/ If you can solve your problem with a LAMP-stack (or equivalent), do yourself a favor and go with it, ignoring all the K8s etc complexity.

4/ The shift from monitoring to observability is the shift from "known unknowns" to "unknown unknowns". Monitoring is like unit tests, we know what to monitor. Distributed systems have an infinite list of failures that make staging worthless.

5/ We should be spending more time and money in tools for looking into production systems. We cannot test everything in staging environments, so we should admit that we need testing in production.

6/ Why do people invest so much in staging testing tooling, when they cannot tell if the system is healthy in the first place, staging or production. Without observability, it's just chaos.

7/ Engineers should build muscle memory. When you ship code, you should go and look at it in production. We need to watch our code run with:

- real data
- real users
- real traffic
- real scale
- real concurrency
- real network

8/ What to test before prod, the known unknowns:

- does it work
- does my code run
- does it fail in ways I can predict
- does it fail in ways it has previously failed

9/ What to test in prod, the unknown unknowns:

- complex behavorial tests
- experiments (A/B testing)
- load tests
- edge cases/weird bugs
- canary, canary, canary
- rolling deploys
- multi-region

10/ Risks of testing in prod

- expose security vulnerabilities
- data loss or contamination of hosts
- sudden app crashes
- resource saturation (due to load testing)
- impossible rollback depending on error
- bad experience to users

11/ We need to start using:

- feature flags for continuous releases
- high cardinality tooling (Honeycomb, FB's Scuba)
- canary
- shadow systems
- capture/replay for databases
- Be less afraid, by using the right tooling

12/ Every engineer should know:

- what normal production looks like
- how to deploy and rollback to a known state
- how to debug in production

13/ SSH-ing into production is a sign something is wrong with instrumentation!

14/ What is observability?

Control theory: It's how much you can understand about the state of the system by looking at its external outputs.

Us: How can we ask new questions, new queries, without having to ship new code each time.

15/ Events, not metrics? Log strings vs structured events?
We need high cardinality -> context, using structured data. Metrics and aggregations strip away the details.

16/ We need raw requests for new investigation queries, so use sampling instead. Aggregations are the devil, a once-way trip. Intelligent dynamic sampling can save space, but help us investigate issues.

17/ We need:

- observability driven development
- comfortably looking at prod
- observability oriented tooling

Zero users care what the "system" health is, all users care about is their experience. So, watch it run in production.

That's it! Great talk👌
