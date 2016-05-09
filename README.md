# koa-decorators
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/DavidCai1993/koa-decorators.svg?branch=master)](https://travis-ci.org/DavidCai1993/koa-decorators)
[![Coverage Status](https://coveralls.io/repos/github/DavidCai1993/koa-decorators/badge.svg?branch=master)](https://coveralls.io/github/DavidCai1993/koa-decorators?branch=master)

Use decorators as single-controller-level koa middlewares or define some meta data for the controller, for now only support [koa 2](https://github.com/koajs/koa/tree/v2.x).

## Installation

```sh
npm install koa-decorators
```

## Decorators

* [@router](#router)
* [@required](#required)
* [@limiter](#limiter)

## Docs

### @router

Specified the router information for the controller.

It accepts two arguments:
  - method: `String`, the HTTP method, required.
  - path: `String`, the path, required.

#### route(app, path)

Mount all routers specified by the `@router` decorator.
  - app: `Object`, an instance of `Koa`.
  - path: `String`, path to the directory of routers.

#### Example

Supposed that all your router files are put in `./apis`:

```js
// apis/user.js
'use strict'
const {router} = require('koa-decorators')

module.exports = class UserController {
  @router({method: 'GET', path: '/user'})
  async getUser (ctx) {
    ctx.body = 'user'
  }
}
```

And in outside `app.js`:

```js
// app.js
'use strict'
const Koa = require('koa')
const {route} = require('koa-decorators')

const app = new Koa()

route(app, `${__dirname}/apis`)

app.listen(3003)
```

Then `koa-decorators` will help you to mount all routers in `./apis`:

```sh
> curl localhost:3003/user
> user
```

### @required

Add a koa middleware for the router to make sure some parameters should be in query-string or request body.

It accepts two arguments:
  - query: `Array<String>`, all keys required in query-string, optional.
  - body: `Array<String>`, all keys required in request body, optional.

#### Example

```js
// apis/user.js
'use strict'
const {router, required} = require('koa-decorators')

module.exports = class UserController {
  @router({method: 'GET', path: '/user'})
  @required({query: 'id'})
  async getUserById (ctx) {
    ctx.body = 'user'
  }
}
```

```sh
> curl localhost:3003/user
> 412 Query: id required

> curl localhost:3003/user?id=1
> user
```

### @limiter

Add rate-limiting for the decorated controller.

It accepts two arguments:
  - limit: `Number`, milliseconds, the times this controller can be visited in `duration`, by default it is `10000`.
  - duration: `Number`, milliseconds, by default it is `60000`.

#### Example
```js
// apis/user.js
'use strict'
const {limiter} = require('koa-decorators')

module.exports = class UserController {
  @router({method: 'GET', path: '/user'})
  @limiter({limit: 3, duration: 60000})
  async getUserById (ctx) {
    ctx.body = 'user'
  }
}
```

```sh
> curl localhost:3003/user
> user
> curl localhost:3003/user
> user
> curl localhost:3003/user
> user
> curl localhost:3003/user
> Too Many Requests
```
