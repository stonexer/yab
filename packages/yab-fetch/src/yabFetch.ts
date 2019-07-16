import compose from 'koa-compose';

import {
  YabRequestInit,
  YabFetcher,
  MethodType,
  YabFetchMiddleware,
  IYabFetchContext
} from './types/index';
import { getYabRequestInit, getRequestInit } from './utils/index';
import { defaultErrorHandler } from './resolvers/default';
import { YabFetchContext } from './context';

const DEFAULT_INIT: YabRequestInit = {
  contentType: 'json',
  onError: defaultErrorHandler
};

export function createFetch<TFetchResult = IYabFetchContext>(
  requestInit?: YabRequestInit & {
    resolveData?(context: IYabFetchContext): Promise<TFetchResult>;
  }
): YabFetcher<TFetchResult> {
  const browserFetch = window.fetch;
  const middlewares: YabFetchMiddleware[] = [];

  const currentFetch = (async (url: string, directOptions?: YabRequestInit) => {
    const yabRequestInit = getYabRequestInit(
      { ...DEFAULT_INIT },
      requestInit,
      directOptions,
      { url }
    );

    const context = new YabFetchContext(yabRequestInit);

    const fetchMiddleware = async (ctx: IYabFetchContext) => {
      try {
        const response = await browserFetch(
          yabRequestInit.url,
          getRequestInit(yabRequestInit)
        );

        ctx.response = response;
      } catch (error) {
        ctx.error = error;
      }
    };

    const callback = compose([...middlewares, fetchMiddleware]);

    await callback(context);

    if (yabRequestInit.resolveData) {
      return yabRequestInit.resolveData(context);
    }

    return context;
  }) as YabFetcher<TFetchResult>;

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

  currentFetch.use = (middleware: YabFetchMiddleware) => {
    middlewares.push(middleware);
  };

  return currentFetch;
}
