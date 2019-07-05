import { YabRequestInit, YabFetcher, MethodType } from './types/index';
import { getYabRequestInit, createURL, getRequestInit } from './utils/index';

import { Middleware } from './utils/middleware';

function defaultErrorHandler(err: Error): Error {
  // eslint-disable-next-line no-console
  console.error(`Error in yab-fetch`, err);
  throw err;
}

export function createFetch(requestInit?: YabRequestInit): YabFetcher {
  const browserFetch = window.fetch;
  const _middlewares: Middleware[] = [];

  const currentFetch = (async (
    directURL: string,
    directOptions?: YabRequestInit
  ) => {
    const yabRequestInit = getYabRequestInit(
      {
        onError: defaultErrorHandler
      },
      requestInit,
      directOptions
    );

    const url = createURL(directURL, yabRequestInit.params);

    const fetchRequest = _middlewares.reduce(
      ({ url, init }, middleware) => {
        return middleware(url, init);
      },
      { url, init: getRequestInit(yabRequestInit) }
    );

    try {
      return browserFetch(fetchRequest.url, fetchRequest.init);
    } catch (err_1) {
      return defaultErrorHandler(err_1);
    }
  }) as YabFetcher;

  (['get', 'delete'] as MethodType[]).forEach((method) => {
    currentFetch[method] = (url: string, yabInit?: YabRequestInit) =>
      currentFetch(url, { method, ...yabInit });
  });

  (['post', 'put', 'patch'] as MethodType[]).forEach((method) => {
    currentFetch[method] = (
      url: string,
      data?: unknown,
      yabInit?: YabRequestInit
    ) => currentFetch(url, { method, data, ...yabInit });
  });

  currentFetch.useMiddlewares = (...middlewares) => {
    _middlewares.push(...middlewares);
    console.log('middlewares:', middlewares);
  };

  return currentFetch;
}
