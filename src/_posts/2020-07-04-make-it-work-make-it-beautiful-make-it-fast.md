---
title: Make it Work, Make it Beautiful, Make it Fast
description: "How I approach writing code and solving problems."
---

>The OTP team is respecting the old slogan: first make it work, then make it beautiful, and only if you need to, make it fast.

I was reading the [Learn You Some Erlang](https://learnyousomeerlang.com/maps) book this morning and at some point I stumbled upon the above sentence. I heard this phrase online for the first time about 2 years ago from Jose Valim (creator of [Elixir](https://elixir-lang.org/)) during one of his [Advent of Code videos](https://www.twitch.tv/josevalim/videos).

This phrase really resonates with me because this is exactly how I approach writing code and solving problems as well. Let's elaborate a bit more...

## Make it work

The main reason we write code (other than fun) is to solve a problem, and if our solution is not correct, then we didn't do our job. **Correctness comes first!**

During this step, I usually write code without too much thinking into abstractions, how to design the components, function names, or other appealing details. I just want to solve the problem.

## Make it beautiful

This step can be intepreted in many ways depending on the programming language used, the domain of the problem, your team, etc. 

However, it could be refactoring the public API of your library/module, coming up with the right abstractions, splitting long functions into smaller more testable ones, and anything else that makes the code readable, extensible, and ready to be reviewed by your peers.

## Make it fast

This step can be considered optional in a lot of day-to-day cases. However, it's always good practice, and over time it can become a habit to check your code for performance issues. 

You solved the problem correctly (step 1), and the code is all pretty and ready to be reviewed (step 2), but is it fast enough? An even better question would be: _Is it slow enough to cause problems?_

The time and effort you put into making your solution fast solely depends on your use-case, but always remember to ask this question.

## Conclusion

Always follow this approach when writing code:
1. Make it work
2. Make it beautiful
3. Make it fast
