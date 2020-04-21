---
title: Fun with Typescript, Webpack and ReactJS
description: A small fun-project with Typescript, Webpack and ReactJS. Numerology calculates your life path number.
---

I decided to play around with [Typescript](https://www.typescriptlang.org/) instead of [BabelJS](https://babeljs.io/), which I already tried in the past, for this weekend's project. 

## Reasons for Typescript

During the last year I explored several Javascript **languages/flavors** (transpilers, etc.). If you read my previous articles you should know that I also like [Dart](https://www.dartlang.org/). I started using it in 2014 along with [AngularDart](https://github.com/angular/angular.dart) throughout its journey to the stable version 1.0, always going through refactorings and fixing breaking changes. But Dart made me feel again productive and gave me a sensible platform to do front-end development. Unfortunately, it did not pick up as many fans as Google (and me) wanted so it was kinda left behind.

I really believe that the future lies in languages that compile to Javascript or even something else, **WebAssembly** maybe? ([WebAssembly homepage](https://webassembly.github.io/) and [Article](https://medium.com/javascript-scene/what-is-webassembly-the-dawn-of-a-new-era-61256ec5a8f6#.pb2824qir) )

I already gave a go to Babel, so this time it was time for Typescript. Why choose Typescript and not stay with Babel is justified by the points below.

* I love static typed languages :) and Typescript is much closer to that rather than JS
* I prefer compilation errors much more than runtime exceptions
* I believe it will be alive for at least 3 more years since it is backed by **Microsoft** and **Google** and is used as the main language for **Angular 2**
* Better IDE support (if I decide to use one)

## Project

I wanted to not spend more than 1-2 days so I have chosen something super simple to implement. I decided to develop a **numerology** calculator of your life path number :) Fancy stuff!

[Calculate your life path number at the demo page](/articles/webdev-typescript-webpack-react-numerology/demo/)

## Build Process

My main goal with the project was to come up with a build process using **Typescript** with **ES6**, **Webpack** and **ReactJS**. I also wanted to use **Autoprefixer** and **SASS** so I added **Gulp** to the mix too, but I tried to keep it at a bare minimum.

The final process is explained in the following sections.

### Code

I wanted from the beginning to consolidate the code building into one tool, and the decision was pretty easy since [Webpack](http://webpack.github.io/) is the big winner (at least for now).

The requirements are simple:

* Write my code in Typescript
* Use ES6 features
* Support browsers that only have ES5 support
* As a bonus I also wrote the gulpfile in Typescript and used a hack-around to use it to actually compile the Typescript code :)

For **ReactJS** I needed to install **react** and **react-dom** along with their typings to allow Typescript to resolve the React types. Pretty smooth process and I also found out something I did not know before. With webpack I can use the npm modules during development but **do not** bundle them along with my app code to keep the footprint small. By specifying that these modules are external I just need to use **script** tags in my HTML to import the public ReactJS libraries and take advantage of CDNs and local cached versions.

```bash
npm install typescript typings react-dom react --save-dev
typings install dt~react dt~react-dom --global --save
```

In order to be able to use some of the ES6 features, like **Object.assign()**, I had to include [es5-shim](https://cdnjs.com/libraries/es5-shim) and [es6-shim](https://cdnjs.com/libraries/es6-shim) in my HTML code right before I imported the Typescript compiled bundled which targets **ES5**. I also needed to install the typings for ES6 in order to stop Typescript compilation errors when using ES6 features in the code.

```bash
typings install dt~es6-shim --global --save
```

So, the Typescript compiler will use the typings and compile the code into ES5-valid Javascript and then Webpack will take all the files and output 2 bundles. I like to have separation between the app code which is Typescript and other JS code I might have, so I compile a bundle for the Typescript code **ts.bundle.js** and one for normal JS-code **js.bundle.js**.

**Use Typescript for the Gulpfile**

I could have used regular ES5 Javascript to write the Gulpfile but I wanted to play more with Typescript. I spend some time to be honest searching for solutions for this and I ended up following [this awesome guide](https://medium.com/@pleerock/create-a-gulpfile-and-write-gulp-tasks-using-typescript-f08edebcac57#.55q6zomio) adapting it where needed.

### SASS and Build

No surprises here! Gulp is used to clean the build directory, to use [Autoprefixer](https://github.com/postcss/autoprefixer) to prefix new/useful CSS with browser-prefixes and to build the final CSS using [SASS](http://sass-lang.com/).

## Conclusion

I spend some time back and forth with the Typescript documentation, expected since this is the first time I tried it, but I liked it. I am going to stick with this for a while until I find something much more productive and powerful, [ScalaJS](https://www.scala-js.org/) might be that one  :)

Finally, I liked ReactJS too, and this is the second fun-project I do using it, but since I am an **Angular die-hard** I have to try the stable version of [Angular 2](https://angular.io/) (which just released RC) to decide **if** there is a winner between them.

If you have a better pipeline for the above tools please contact me :)

[Source code is hosted at Github](https://github.com/lambrospetrou/numerology/)