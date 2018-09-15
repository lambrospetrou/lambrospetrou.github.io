---
title: Meiosis pattern - Unidirectional data flow web applications using streams
description: Develop website applications without being tied to a single framework. Use the Meiosis pattern and streams to provide sane state management to your applications. Usable with Mithril, React, Preact, Inferno, and others.
---

## Problem

After using [ReactJS](https://reactjs.org/) for two years, along with all its ecosystem ([Redux](https://redux.js.org/) for state management, [Redux-saga](https://redux-saga.js.org/) for managing side-effects, etc.) I wanted to experiment with a simpler approach where I was not forced to use many framework specific libraries, but at the same time having the same uni-directional flow of data and the ease of UI creation using components.

A few months ago, I came across [Mithril](https://mithril.js.org/), a lightweight component based framework which uses pure Javascript objects for its components. I was instantly hooked and wanted to use it in all my personal projects.

_**How can I get the state management I want without being tied to a framework so that I can use Mithril or React interchangeably without issues?**_

**TL;DR**

My answer is using [Meiosis pattern](https://meiosis.js.org/).

## Streams

In order to properly understand the solution let's go over some basics regarding streams.

There are several Javascript stream libraries but for the rest of the article I will use [Mithril/stream](https://mithril.js.org/stream.html).

Meiosis requires three basic operations on streams:

1. [Updating the stream value](https://mithril.js.org/stream.html#streams-as-variables)
2. [Mapping over the stream](https://mithril.js.org/stream.html#streammap) in order to listen for updates to the stream's value
3. [Scanning over the stream](https://mithril.js.org/stream.html#streamscan) in order to calculate accumulated value after every update

### Updating the stream value

```javascript
import * as ms from 'mithril/stream'

const s = ms()
s(1)
console.log(s())  // 1
s(s()+10)
console.log(s())  // 11
```

The example above shows that just calling a stream as a function will return the latest value of the stream, and supplying a value to the function application will update the stream's value.

Also, the fact that the stream itself is a function can be super useful since it can be composed into more complex functions.

### Stream.map

```javascript
import * as ms from 'mithril/stream'

const s = ms()

s.map(value => console.log(`updated value: ${value}`))

s(1)    // prints "updated value: 1"
s(20)   // prints "updated value: 20"
s(311)  // prints "updated value: 311"
```

The [Stream.map](https://mithril.js.org/stream.html#streammap) operation is simple. It just executes a given function every time the stream value is updated, and also returns a new stream. The return value of the given function after every execution becomes the new value for the stream returned by the call to `map()`.

### Stream.scan

```javascript
import * as ms from 'mithril/stream'

const accumulate = (accumulator, value) => accumulator * value
const processValue = value => console.log(value)

const s = ms()
const scanned = ms.scan(accumulate, 1, s)
scanned.map(processValue)

s(1)    // prints 1
s(2)    // prints 2
s(5)    // prints 10
s(100)  // prints 1000
s(0.5)  // prints 500
```

The distilled functionality of [Stream.scan](https://mithril.js.org/stream.html#streamscan) is that whenever the value of the source stream (`s`) changes, the `accumulate` function is called being passed the current accumulator value and the new source stream value. The return value will become the new value of the `scanned` stream and the accumulator value being passed to the next `accumulate` invocation.

The fascinating idea here is that a stream can have functions as its values.

In the following example we pass functions as values and as a result we can apply different operations on the accumulator value each time.

```javascript
import * as ms from 'mithril/stream'

const update = (accumulator, fn) => fn(accumulator)
const processValue = value => console.log(value)

const s = ms()
const scanned = ms.scan(update, 1, s)
scanned.map(processValue)

s(value => value + 1)         // prints 2
s(value => value - 1)         // prints 1
s(value => value * 10)        // prints 10
s(value => 1234)              // prints 1234
s(value => value / 2)         // prints 617
```

Spend a few minutes to **fully** understand the above example because it's the bread and butter of the Meiosis pattern.

Notice how we pass functions in the stream and by the use of `scan` they are applied in order transforming the stream accumulated value.

## Meiosis Pattern

The [Meiosis website](https://meiosis.js.org/) is doing an amazing job describing the pattern and includes a brief video showcasing how to use the pattern.

Meiosis was inspired by similar projects striving for unidirectional flow of data to make state management easy like [SAM Pattern](http://sam.js.org/), [Elm Architecture](https://guide.elm-lang.org/architecture/index.html), [CycleJS](http://www.christianalfoni.com/articles/2016_04_06_CycleJS-driven-by-state), and others.

The whole Meiosis pattern is contained in the following code:

```javascript
import * as ms from 'mithril/stream'

class AppModel {
  counter: number = 0
}
type ModelUpdateFunction = (model: AppModel) => AppModel
type UpdateStream = ms.Stream<ModelUpdateFunction>

const createApp = (update: UpdateStream) : MeiosisApp => ({ 
  initialModel: ..., view: ..., render: ...
})

const setupMeiosis = (
  createApp: (s: UpdateStream) => MeiosisApp,
  container: Element
) => {
  const update = ms<ModelUpdateFunction>()
  const modelUpdate = (model: AppModel, fn: ModelUpdateFunction) => fn(model)

  const app = createApp(update)

  const models = ms.scan(modelUpdate, app.initialModel(), update)
  models.map(model => app.render(container, app.view(model)))
}

setupMeiosis(createApp, document.body.querySelector('#app') as Element)
```

Let's examine each section separately to fully understand the pattern.

```javascript
const update = ms<ModelUpdateFunction>()
```

The code above creates the `update` stream that has functions as its values. These functions receive an `AppModel` and return a new `AppModel`. These functions are going to be our actions, that are triggered either by a user interaction or by an asynchronous task, fetch, etc.

```javascript
const app = createApp(update)
```

This creates our application, which receives the `update` stream that will be used by the application's actions.

In addition, the `app` exposes three methods:

* `initialModel()` returns the initial `AppModel` which will act as the bootstrapping model for the application.
* `view(model)` receives the latest `AppModel` and returns the view to be rendered. This view can be of any framework (e.g. React, Mithril).
* `render(element, view)` receives the application view, and the DOM element to which the view will be rendered. Meiosis does not care about the framework used as long as there is functionality to render a view on-demand. Mithril, React, Preact, Inferno, etc. are able to do this efficiently with the use of virtual dom.

```javascript
const models = ms.scan(modelUpdate, app.initialModel(), update)
models.map(model => app.render(container, app.view(model)))
```

This is the juicy part of the pattern.

The `models` stream is a scanned stream over the `update` stream. This means that any function passed into the `update` stream, due to the `scan` functionality described previously, will be used to transform the current application model into a new model, and then set that model as value in the `models` stream.

The second line applies a `map` operation over the `models` stream. This will render the application view using the updated application model every time there is a new value pushed to the `update` stream. Remember that the values of the `update` stream are functions that transform the model.

This deviates slightly from traditional frameworks in the sense that when an action occurs, instead of publishing the updated model itself, the transformation functions are pushed, and the `Stream.scan` functionality takes care of applying those transformations to the model/state.

## Demo

The following code is a complete demo implementing a counter, with `plus/minus` buttons.

```javascript
import * as m from 'mithril'
import * as ms from 'mithril/stream'

class AppModel {
  counter: number = 0
}
type ModelUpdateFunction = (model: AppModel) => AppModel
type UpdateStream = ms.Stream<ModelUpdateFunction>

interface MeiosisApp {
  model: () => AppModel
  view: (model: AppModel) => m.Vnode
  render: (el: Element, v: m.Vnode) => void
}

const createActions = (update: UpdateStream) => ({
  inc: (value: number) => update(model => ({counter: model.counter + value}))
})

const createApp = (update: UpdateStream): MeiosisApp => {
  const actions = createActions(update)
  return {
    model: () => ({counter: 0}),
    view: (model: AppModel) => m("div", [
      m('p', {onclick: () => actions.inc(1)}, model.counter),
      m('button', {onclick: () => actions.inc(1)}, 'plus'),
      m('button', {onclick: () => actions.inc(-1)}, 'minus')
    ]),
    render: (container: Element, v: m.Vnode) => m.render(container, v)
  }
}

const setupMeiosis = (
  createApp: (s: UpdateStream) => MeiosisApp,
  container: Element
) => {
  const update = ms<ModelUpdateFunction>()
  const modelUpdate = (model: AppModel, fn: ModelUpdateFunction) => fn(model)

  const app = createApp(update)

  const models = ms.scan(modelUpdate, app.model(), update)
  models.map(model => app.render(container, app.view(model)))
}

setupMeiosis(createApp, document.body.querySelector('#app') as Element)
```

[Demo repository on Github](https://github.com/lambrospetrou/code-playground/tree/master/meiosis-mithril-ts)

## Conclusion

After working with most of the Javascript frameworks the last few years, I enjoy having the following while developing an application:

* Immutability of state/data
* Unidirectional flow of data (actions => update state => render updated view => actions)
* Fast component rendering (the best solutions as of now use virtual dom diffing)

Adopting Meiosis pattern in my applications, means that all of the above are possible, and the only thing tied to a specific framework is really just the view components. Taking the above code, and replacing Mithril with React is just a matter of a few minutes.

I hope that more engineers will start adopting patterns that are applicable to all kinds of Javascript applications instead of focusing on framework specific solutions.
