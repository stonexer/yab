English | [简体中文](./README.zh-CN.md)

<p align="center"><img width="300" src="media/logo.png" alt="Vue logo" /></p>
<div align="center">
<p>Some tools fot fetch.</p>
<a href="https://circleci.com/gh/stonexer/yab/tree/master"><img src="https://circleci.com/gh/stonexer/yab/tree/master.svg?style=shield&circle-token=0386ba2e8d3d98f85b0c5e61977a8ded9cf95332" /></a>
<a href="https://codecov.io/gh/stonexer/yab"><img src="https://codecov.io/gh/stonexer/yab/branch/master/graph/badge.svg" /></a>
</div>

## Introduction
There is no good high-level libs base on Fetch API, so we create yab.

## Features
- **Middleware**: koa like middleware.


## Getting Started

### Installation
#### npm
`npm install yab-fetch`

#### yarn
`yarn add yab-fetch`

#### CDN
```html
<script src="https://unpkg.com/yab-fetch.min.js"></script>
```

### Useage
```ts
import { createFetch } from 'yab-fetch';

const request = createFetch();
request.get('https://example.com');
```

More API details, please read [Yab-fetch](./packages/yab-fetch/README.md)

#### fetch with middlewares
Yab-fetch can use koa like middleware, here is an example of useing [yab-fetch-middleware-cache](./packages/yab-fetch-middleware-cache).
```ts
import { createFetch } from 'yab-fetch';
import { createCacheMiddleware } from 'yab-fetch-middleware-cache';

const request = createFetch();
request.use(createCacheMiddleware());

request.get('https://example.com');
```


## Packages

This repository is a monorepo that we manage using Lerna. That means that we actually publish several packages to npm from the same codebase, including:

| Package                                                      | Version                                                      | Description                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| [`yab-fetch`](/packages/yab-fetch)                           | [![npm](https://img.shields.io/npm/v/yab-fetch.svg?style=flat-square)](https://www.npmjs.com/package/yab-fetch) | The fetch library.                                       |
| [`yab-fetch-middleware-cache`](/packages/yab-fetch-middleware-cache) | [![npm](https://img.shields.io/npm/v/yab-fetch.svg?style=flat-square)](https://www.npmjs.com/package/yab-fetch) | A yab middleware, fouse on cache response using IndexDB. |


## Changelog
Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## Contributors
Thanks goes to the wonderful people.


## License

[MIT](http://opensource.org/licenses/MIT)
