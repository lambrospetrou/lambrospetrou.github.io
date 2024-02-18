---
title: "Skybear.net Scripts private user accounts - Changelog 2024-02-18"
description: "Skybear.NET Scripts platform changelog for February 2024."
---

[Skybear.net Scripts](https://www.skybear.net) is a managed platform to execute [Hurl.dev scripts](https://hurl.dev/).
I like to describe Hurl scripts as simple workflows that orchestrate a sequence of HTTP requests, while doing response assertions and transformations.

I blogged about the silent first release of an earlier version of the tool two months ago ([see article](/articles/hurl-webscripts/)), coined as **Hurl Webscripts**.

## Rebranding to skybear.net

First update since that article, is that now the platform is hosted under the [**Skybear.net**](https://www.skybear.net) brand.

I own several top-level `skybear` domains, and this is perfect use-case for them 😅

The previously released <https://webscripts.lambrospetrou.com> now redirects straight to the [Skybear.net Open Editor](https://www.skybear.net/scripts/open-editor/), so no existing shared links broke during this migration.

<figure>
  <img src="/articles-data/2024-02-18-skybearnet-scripts-changelog-2024-02-18/2024_02_18-skybearnet-og_image.jpg" title="Skybear.net Scripts cover image" alt="Skybear.net Scripts cover image" />
  <figcaption>Skybear.net Scripts</figcaption>
</figure>

## User accounts

This was a beefy release and took several weeks to rollout publicly.
It was in production behind feature flags with me the sole user though for a while now.

The main reason is that it introduces user accounts, and everything from now on revolves around these accounts in terms of ownership, storage, and access control.

Previously you could only work with the Open Editor and sharing your scripts with others putting the whole script source code into the URL as params.
This was fine as an initial release, but in the end it's not easy to iterate on a script, make improvements, and save those changes if you need to always get a new URL to store in your own records.

Now, with private scripts in your account, you can create as many scripts as you want, edit them and save them as many times as necessary to get them right, and they are persisted on the platform so you don't have to worry about keeping track of your scripts.

It took a bit of time to fully roll this out cause I wanted to take into account future features too and implement it properly. Few things coming over the next couple of months include SSO authentication, teams and organizations, inviting users to read or author your scripts with you, and lots more.

It's finally out though! 🎉 New features will now ship in a more regular cadence.

<figure>
  <img src="/articles-data/2024-02-18-skybearnet-scripts-changelog-2024-02-18/2024_02_18-skybearnet-signin_page.jpg" title="Skybear.net Scripts sign in page" alt="Skybear.net Scripts sign in page" />
  <figcaption>Skybear.net Scripts sign in page.</figcaption>
</figure>

## Script management

The script management story is very simplistic at the moment, but complete, in the spirit of [SLC (**S**imple, **L**ovable, **C**omplete)](https://longform.asmartbear.com/slc/).

You can create scripts, update their source code, execute them, see the execution results, and finally list all your scripts.
Deleting scripts is the obvious miss in that list, but don't worry. It's almost done, just needing a few final touches and it's out next week.

I have many other plans for script management, but they will be added incrementally. I don't want to release features that make the product feel incomplete when directly related features are missing, so I am bundling them in batches.

As the SLC article above explains, it's better to develop a bicycle in v1, even if your v5 will be a car.
You can already get value out of Skybear.net scripts without feeling out-of-place.

<figure>
  <img src="/articles-data/2024-02-18-skybearnet-scripts-changelog-2024-02-18/2024_02_18-skybearnet-list_page.jpg" title="Skybear.net Scripts list page" alt="Skybear.net Scripts list page" />
  <figcaption>Skybear.net Scripts listing page.</figcaption>
</figure>

## Coming very soon

User accounts and script management, were the two main features prepping the ground for everything else to follow.

I am so glad this release is finally out, and I can now gradually add features, much faster!

Some of the short-term features that are either already in-progress or will be soon:
- Upgrade the [Hurl](https://hurl.dev/) execution engine to `v4.2.0` from `v4.1.0`.
- Support for names and descriptions per script for easier identification, in addition to the existing generated IDs.
- Include all the HTTP responses of the script execution in the results, giving you complete visibility.
- Add many more examples to make it easy to author Skybear.net scripts. (There are some fancy features I am brewing in this topic long-term...🤐)

Too many nice things coming up! ✨

## Conclusion and feedback

[Skybear.net Scripts](https://www.skybear.net) is now ready for more complex Hurl workflows.

I already experimented with some workflows doing more than 300 HTTP requests (😮), asserting the responses, and making sure everything works correctly.

I want to see your own scripts, your own workflows, and your own use-cases.
I am eager to hear your feedback and feature requests.

If you have any questions, email me, or reach out at [@lambrospetrou](https://twitter.com/LambrosPetrou).

---------------

<figure>
  <img src="/articles-data/2024-02-18-skybearnet-scripts-changelog-2024-02-18/2024_02_18-skybearnet-linkedin_post.jpg" title="Skybear.net Scripts release LinkedIn post" alt="Skybear.net Scripts release LinkedIn post" />
  <figcaption>Skybear.net Scripts release LinkedIn post on 2024-02-18 (<a href="https://www.linkedin.com/posts/lambrospetrou_skybearnet-scripts-activity-7165011769210482689-5Vhd" target="_blank">see post</a>).</figcaption>
</figure>
