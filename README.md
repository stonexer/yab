English | [简体中文](./README.zh-CN.md)

<p align="center"><img width="300" src="media/logo.png" alt="Vue logo" /></p>
<div align="center">
<p>Some tools fot fetch.</p>
<a href="https://circleci.com/gh/stonexer/yab/tree/master"><img src="https://circleci.com/gh/stonexer/yab/tree/master.svg?style=shield&circle-token=0386ba2e8d3d98f85b0c5e61977a8ded9cf95332" /></a>
<a href="https://codecov.io/gh/stonexer/yab"><img src="https://codecov.io/gh/stonexer/yab/branch/master/graph/badge.svg" /></a>
</div>

## Introduction
There is no good high-level libs base on Fetch API, so we create yab.

## Packages

This repository is a monorepo that we manage using Lerna. That means that we actually publish several packages to npm from the same codebase, including:

| Package                                                      | Version                                                      | Description                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| [`yab-fetch`](/packages/yab-fetch)                           | [![npm](https://img.shields.io/npm/v/yab-fetch.svg?style=flat-square)](https://www.npmjs.com/package/yab-fetch) | The fetch library.                                       |
| [`yab-fetch-middleware-cache`](/packages/yab-fetch-middleware-cache) | [![npm](https://img.shields.io/npm/v/yab-fetch.svg?style=flat-square)](https://www.npmjs.com/package/yab-fetch) | A yab middleware, fouse on cache response using IndexDB. |

## Documentation
Please read each package's README.


## Changelog
Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).


## License

[MIT](http://opensource.org/licenses/MIT)
