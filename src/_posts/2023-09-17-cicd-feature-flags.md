---
title: "Feature Flags — CI/CD"
description: "This article dives deep into feature flags. A technique that gives you super powers during deployments of new versions of your software."
---

I originally sent part of this article to the mailing list of my [Elements of CI/CD](https://www.elementsofcicd.com?ref=lambrospetrou.com) course, and now sharing it with the rest of you with improvements from the received feedback.

-----

**Table of contents**

- [Overview](#overview)
- [Dynamic configuration](#dynamic-configuration)
- [Not just for the server](#not-just-for-the-server)
- [Beta testing and allowlisting](#beta-testing-and-allowlisting)
- [Rule conditions](#rule-conditions)
- [Feature rollout](#feature-rollout)
- [AB testing and experiments](#ab-testing-and-experiments)
- [Kill-switch](#kill-switch)
- [Testing feature flags](#testing-feature-flags)
- [Managing feature flags](#managing-feature-flags)
- [Conclusion](#conclusion)

## Overview

> **You should adopt and use feature flags as much as possible!**

Feature flags allow you to deploy changes to your software rapidly, and continuously, as many times a day as you want, without sacrificing the reliability of your product.

When you use feature flags, deploying changes is only half the story, since no customer will be exposed to those changes by default.
The second half of the story, is that you selectively enable features to a subset of your customers.
This sounds simple, but it really is a superpower! 💪🏼

Imagine that your product is an Android mobile application where users can search for whiskies, and ultimately buy bottles directly from the website.
You are developing two new features that each needs a few weeks of development and iteration.

- Feature A is getting whisky recommendations based on whiskies you mark as liked.
- Feature B is the addition of new payment providers that would allow customers to buy with less fees.

Two different features, developed in parallel by different (or same) engineers.

In some teams, you would work on these features on separate git branches, and only merge on the production branch that gets deployed when the feature is ready to go live.
This means that you will have two separate branches diverging more and more over time, and you also don't know if something else breaks until you merge back to the production branch.

Too late.

With feature flags, you can continuously merge your code changes to the production branch, and more importantly deploy them to production, while at the same time ensuring that nobody will get exposed to them before they are ready.

We do this by wrapping these in-progress/unfinished features with special conditions that check if the feature is enabled, and if yes, for which users, and only proceed if the current user is allowlisted for the feature.

In our whisky application above, let's assume that feature A will not be enabled at all, and feature B will only be enabled for customers in England since the payment providers we implemented so far and are ready to be tested are for English customers.

Your codebase would call the following Java snippet when displaying the checkout screen:
```java
record User(String id, String country) {};

List<PaymentProvider> getPaymentProviders(
  User user, 
  FeatureFlags ff) { 
  List<PaymentProvider> providers = new ArrayList();
  // ... some code that adds payment providers already supported

  if (ff.isEnabled(FeatureName.PayProviderXYZEnabled, user)) {
    providers.add(new PaymentProviderXYZ());
  }

  return providers;
}
```

The above snippet ensures that the `PayProviderXYZForEngland` is included in the checkout only when the feature flag `FeatureName.PayProviderXYZEnabled` is enabled for the `user` being handled.

A partial implementation of the `FeatureFlags` class for our whisky application can be the snippet below:
```java
record FeatureFlag(
  Set<String> countries, 
  Set<String> userIds, 
  boolean enabledForAll, 
  boolean disabledForAll) {};

class FeatureFlags {
  enum FeatureName {
    PayProviderXYZEnabled,
    WhiskyRecommendationsEnabled
  }

  Map<FeatureName, FeatureFlag> rules = ImmutableMap.of(
    FeatureName.PayProviderXYZEnabled, new FeatureFlag(
      ImmutableSet.of("England"), 
      Collections.emptySet(), 
      false, 
      false
    ),
    FeatureName.WhiskyRecommendationsEnabled, new FeatureFlag(
      Collections.emptySet(), 
      Collections.emptySet(), 
      false, 
      false
    )
  );

  boolean isEnabled(FeatureName featureName, User user) { 
    FeatureFlag ff = this.rules.get(featureName);
    if (ff.disabledForAll()) {
      return false;
    }
    return ff.enabledForAll() || 
           ff.countries().contains(user.country()) || 
           ff.userIds().contains(user.id());
  }
}
```

In the above implementation of `FeatureFlags` our features can be selectively enabled for users based on their country, and their ID.

I have seen teams and companies implementing feature flags in vastly different ways.
There are implementations as simple as the above, and there are implementations that have complex rules as we will explore in following sections.

You can see that in a few lines we have a functioning feature flags system that allows you to selectively execute code based on the user, or any other condition you need.
This means that you can safely merge your code changes even if the features you work on are unfinished, or even incorrect, as long as you wrap their entry point execution call with a feature flag condition check.

### Feature flags are a superpower

Feature flags are a superpower, and by using them you:
- Can continuously merge and deploy changes, thus increasing your velocity.
- Can make sure that all the in-progress changes are integrated into the production branch and do not cause other features to break.
- Avoid maintaining separate diverging git feature branches that go out of date and lead to annoying time-wasting merge conflicts.
- Can test features and get early feedback with as few, and as many, customers as you want.
- Can quickly enable, and more importantly, disable, a feature by just changing a boolean value. Quickly rolling back broken features is now trivial!

The rest of the article will focus on popular use-cases for using feature flags.
Going through these use-cases will hopefully make the benefits and power of feature flags clear.

### Also known as

Feature flags also go by the following terms (non-exhaustive):

- Feature switches
- Feature toggles
- Experiments
- A/B testing (feature flags can be used for A/B testing as well)

## Dynamic configuration

Feature flags are one use-case of dynamic configuration in our software applications.

In the code snippets above implementing the `FeatureFlags` class for our imaginary Android application, we used hardcoded rules for the features we wanted to conditionally enable.

This means that in order to update these rules, e.g. adding new user IDs to existing flags or adding new flags, we would need to go through the application CI/CD pipeline, and deploy the application itself to use the updated rules.
Depending on the nature of our product this might not allow us to iterate on the feature flags themselves easily, and we wouldn't be able to rollout many changes per minute/hour.

To solve this issue, we need to move the definition of rules outside our main applications, into their own artefacts, with their own CI/CD pipeline that can be executed independently of the application's pipelines.

A common approach I have seen in practice is to put the feature rules in text files (e.g. JSON, YAML, TOML) and have a CD/CD pipeline deploy them in Amazon S3-compatible buckets in different regions.

Our applications will have to be adapted to periodically (every 1 minute) fetch these configuration files, and recreate the `rules` inside the `FeatureFlags` class based on the latest configuration files.
This exact flow was how one of our feature flag systems worked a few years ago, while I was working on the AWS Console for [Amazon CodeGuru Profiler](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/what-is-codeguru-profiler.html).

An alternative would be to use SaaS services like [LaunchDarkly](https://launchdarkly.com/) or [PostHog feature flags](https://posthog.com/feature-flags) to configure your feature rules, and then in your application code you would call their APIs to get a decision.

There are myriad ways you can make your feature flags dynamically configured, but in all cases you want to have:
- Separate deployment pipeline for the feature rules, outside the application's deployment process.
- Quick rollout of feature rules updates (forward updates, and rollbacks).
- Periodic update of the active feature rules inside the applications.
- Safe rollout of feature rules (if latest version is invalid, use the previous one to avoid breaking the applications).

<figure>
  <img src="/articles-data/2023-09-17-cicd-feature-flags/s3-feature-flags.png" title="Diagram showing the flow of dynamically updating feature flags and propagating them to the application with S3" alt="Diagram showing the flow of dynamically updating feature flags and propagating them to the application with S3" />
  <figcaption>Example of data flow for updating, storing, and fetching feature flag rules from Amazon S3.</figcaption>
</figure>

## Not just for the server

Feature flag systems are not only for servers and backends.

Even though the actual feature rules will indeed have to be served by some server API, at some point, they can be used for multiple application types.

**You can use them on websites.**

When the static assets are served, you can inject the feature rules inside the HTML document.
Or, you can provide a dedicated API that the website will call once loaded to fetch all enabled features for the user session, and update periodically.
Or, you can retrieve the feature rules every time the user logins or refreshes their session token.

**You can use them on mobile applications.**

Hardcoded feature rules in the application itself can be used, but will only be able to be updated from inside the application itself (e.g. user enabling an experimental feature), or when the application itself is upgraded.
Usually, you provide a dedicated API that the application will call once loaded to fetch all enabled features for the user, and repeat periodically.

**Offline applications.**

In cases where there is no network connectivity or calling remote APIs is not possible, we can still use feature flags in the hardcoded fashion we explored previously.

The user of the application will need to do specific actions to enable or disable the features.
For example, in several CLI applications you need to provide specific commands to enable experimental features (e.g. [Node.js](https://nodesource.com/blog/experimental-features-in-node.js/)).
In Android systems, you can [enable advanced Developer Mode](https://developer.android.com/studio/debug/dev-options#enable) by clicking a specific menu item X number of times.

In general, with a bit of imagination you can use feature flags in any kind of software application we build. And you should.

## Beta testing and allowlisting

One important aspect of agile product development is to get feedback from customers as early as possible, and iterate over the application by fixing issues and implementing new features.

Feature flags allow us to expose incomplete and in-progress features to a subset of our customers.

This makes it easy to iterate on our applications without worrying that we are going to negatively impact the rest of our customers.
Not only that, but we can do it straight in our production environments, using real data, real dependencies, and real customers.
The feedback and confidence we can get by using production directly is great.

Feature flags are a great way to implement early access programs for your products, and even paid tester programs where you allow organisations and individuals to test your product, and give you feedback, before releasing it to the public.

## Rule conditions

In the example implementation for `FeatureFlags` we used the user's ID and originating country as the rule conditions.
There are hundreds of different conditions that we can use. 

Simple user conditions include:
- ID
- originating country
- pricing plan
- device type
- company/organization of the user (in B2B cases)

Apart from user specific conditions, we can have global conditions:
- deployment environment region (e.g. only in AWS `us-east-2`)
- percentage of our hosts (e.g. only 10% of our hosts should use a feature)
- percentage of users (e.g. only 10% of the users should use a feature)

These are just few conditions I have used in the different teams I worked with, and there are way more.
You can even combine multiple conditions together to get fine-grained control of your features.

## Feature rollout

Probably the most popular use-case of feature flags is to gradually, and safely, rollout a new feature.

- While the feature is implemented the feature is enabled only for certain internal users (or nobody), and only in our staging environments.
- Once it's ready for beta testing we enable it for a few customers, and for specific production environments.
- Once it's ready for full release, we enable it for each of our production environments, ideally not all-at-once to avoid breaking all customers in case a bug slipped through.
- If the rollout completed successfully, we remove the code that does the condition check and always use the newly launched feature.
- If the rollout of the feature caused some regression, we can update the rules to disable the feature, and deploy that in order to quickly disable the feature and revert to the working version of the application.

This is the most basic, most common, and arguably the most important use of feature flags.

**Deliver value to your customers, safely, reliably, continuously!**

## AB testing and experiments

A more complex use-case for feature flags is A/B testing (experiments).

A/B testing is when we want to experiment with different variations of the same feature, for example choosing the color of the checkout button between yellow, green, blue.
A/B testing systems usually provide extra features on-top of what we already explored so far, but the underlying technology is often the same.

For example, at Amazon, for the retail website we had our own internal service for feature flags and experiments called **Weblab** [[1]](https://medium.com/fact-of-the-day-1/experimentation-at-amazon-51b35490d805) [[2]](https://www.awa-digital.com/blog/truth-about-amazon-booking-experimentation-culture/#:~:text=much%20copied%20feature.-,Amazon%20created%20its%20own%20experimentation%20platform,-It%20wasn%E2%80%99t%20until) [[3]](https://www.smartinsights.com/digital-marketing-strategy/online-business-revenue-models/amazon-case-study/#:~:text=Amazon%20marketing%20strategy%20experiments).

In Weblab you could create a new feature, or experiment, where you didn't just specify the rules that enabled a feature.
You could specify multiple **treatments** of the feature, and the rules per treatment.

For example, for the checkout button color example, you would have the `Control (C)` treatment, which is the default/existing case when the feature is disabled.
Treatment `T1` was the first option of the feature, e.g. yellow button.
Treatment `T2` was the second option of the feature, e.g. green button.
Treatment `T3` was the third option of the feature, e.g. blue button.

If you just wanted the feature flag functionality you were done, and in the code you would have something like below (not real Amazon-code, just as example):
```java
String treatment = flags.getTreatment(FeatureName.ButtonColor, user);
if (treatment == "C") { 
  this.buttonColor = this.colorDefault; 
} else if (treatment == "T1") {
  this.buttonColor = this.colorYellow;
} else if (treatment == "T2") {
  this.buttonColor = this.colorGreen;
} else if (treatment == "T3") { 
  this.buttonColor = this.colorBlue;
}
```

If you wanted the A/B testing (experimentation) functionality, Weblab would also track key metrics that you specified for each of the treatments.

In the example above, we could track the number of button clicks for each treatment, and therefore we would be able to get concrete data on which button color performed better.

The Weblab implementation showcases that when there is a robust feature flag implemented, there is a lot of interesting functionality that is now made possible.

## Kill-switch

Another common use of feature flags is the kill-switch.

In many important feature rollouts, and big events (e.g. Black Friday, Superbowl, Christmas), you might want to have an easy way to enable/disable specific functionality in your application quickly.
In the kill-switch use-case, we want to disable a feature, or immediately revert to a different implementation of a feature.

Having a kill-switch is very similar to the rollout of a feature that went wrong and we disable it until fixed.
But, instead of the feature flag being temporary, it's permanent.

One real-world example of a kill-switch feature flag I encountered was in Amazon Video.
When we released super popular shows (e.g. The Grand Tour) the demand was very high.
We had several kill-switches all over the codebase in order to quickly disable certain functionality that would allow the services to scale better if we had unexpectedly high traffic.

For example, one of those kill-switches would switch from using server-rendering for the TV Show details page on the Amazon Video website, to using a static file from our CDN that would only show static information and allow you to stream the show.
Even though some features wouldn't be provided (e.g. customer reviews), this emergency measure would allow customers to watch the show, which was the main goal.

In general, most feature flags are meant to be temporary to control the rollout of new features.
There are certain cases where we want the ability to dynamically change our application's behavior, and that's where permanent feature flags come in place, the kill-switches. 

The deactivation/killing of certain features to allow others to perform better, falls into the **graceful degradation technique** ([see AWS reliability pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_mitigate_interaction_failure_graceful_degradation.html), [see META's Defcon](https://www.usenix.org/conference/osdi23/presentation/meza)) we can employ in our complex systems in order to cope with scale.

## Testing feature flags

A common question I get from folks when discussing about feature flags is how to approach testing.

For every treatment of a feature flag, you essentially create another branch of logic that needs to be tested.
Do your unit/integrations tests need to to cover all possible values of the feature flag, or not?

Personally, I do the following thinking process:
- If some code is irrelevant to the feature flag, and is not affected by what the feature flag value will be, then I don't amend the tests related to that code.
- If some code is directly by the value of the feature flag, then I will try to cover it with tests.
  1. If the tests can become parametric, with the feature flag value as input parameter, the best would be to run all those tests for all the possible feature flag values.
  2. If the tests cannot become parametric, then I usually test the happy path for all the feature flag values, and then some edge cases for the final feature flag value.
    - For example, if we introduce a new feature flag for some new functionality, all the existing tests should still pass!
    - Once I confirm that they pass, I mock the feature flag value for those tests to be what the final value will be after the full rollout. This will make sure that existing functionality will work fine once the feature flag is fully rolled out.
    - Finally, I will duplicate some important tests (or somehow make them parametric) with the feature flag off to make sure that some new logic will not inadvertedly depend on the feature flag, and in case we roll back its release we end up with issues.

Testing on its own is a hot-topic.
Some engineers are neutral about it, others like it, others hate it, and you have the extreme camps on either side.

I personally like to have some tests.
I definitely don't push for arbitrary 90%+ coverage, but I also don't like having zero tests for core business logic because it makes development much much slower.

If you like tests, then make them cover the feature flags too.
If you don't like tests, then you shouldn't even be reading this section.

## Managing feature flags

Managing feature flags includes all the actions and procedures you need to have in-place in order to boost your productivity while doing safe rollouts of new features.

1. Have one defined process everyone will follow when creating, updating, and deleting feature flags. This process can be automated with simple CLIs, any low-code workflow tools that can interact with source control, or using any of the SaaS services dedicated to feature flags.
2. A feature flag should almost always have the following lifecycle:
    1. Creation and code changes introducing branching behavior.
    2. Ship code changes with feature flag OFF in staging/production.
    3. Gradually enable the feature flag ON.
    4. Once the feature flag is fully enabled, monitor key metrics for N days/weeks.
    5. Once the verification is done, and the feature flag has been fully enabled for sufficient time, you should now delete the code changes using the feature flag, and make the enabled code branch the new default!
    6. Delete the feature flag.
3. Do code reviews for any feature flag change. Enabling or disabling a feature flag, changes the running code, so treat it as any other code change.
4. Implement some kind of monitoring to notify you when a feature flag is fully enabled for N weeks, and not yet cleaned up. Or even worse, when a feature flag is partially rolled out for N weeks without new changes.

As I said above, a feature flag introduces branching in the code behavior, so you should try to clean them up as soon as possible.

Leftover feature flags, especially partially rolled out ones, are a nightmare to maintain.

## Conclusion

**Use feature flags everywhere!** Backend servers, frontend websites, mobile apps.

Iterating on new features development without the fear of breaking production and impacting customers is a **productivity booster.**

You can start by a simple mechanism of hardcoded feature rules in a file, periodically fetched by your servers, and expand into more complex solutions later.

**Deliver value to your customers, safely, reliably, continuously!** 🚀

### Changelog

- 2023-09-24
  - Added sections "Testing feature flags" and "Managing feature flags".
  - Added table of contents.
