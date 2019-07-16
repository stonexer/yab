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

export class YabFetch {
  private _requestInit?: YabRequestInit;

  private _middlewares: YabFetchMiddleware[];

  public constructor(requestInit?: YabRequestInit) {
    this._middlewares = [];
    this._requestInit = requestInit;
  }

  public fetch = async (url: string, directOptions?: YabRequestInit) => {
    // TODO: move to static
    const browserFetch = window.fetch;

    const yabRequestInit = getYabRequestInit(
      { ...DEFAULT_INIT },
      this._requestInit,
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

    const callback = compose([...this._middlewares, fetchMiddleware]);

    await callback(context);

    if (yabRequestInit.resolveData) {
      return yabRequestInit.resolveData(context);
    }

    return context;
  };

  public use = (middleware: YabFetchMiddleware | YabFetchMiddleware[]) => {
    if (Array.isArray(middleware)) {
      this._middlewares.push(...middleware);
    } else {
      this._middlewares.push(middleware);
    }
  };
}

export function createFetch(requestInit?: YabRequestInit): YabFetcher<unknown> {
  const yabFetch = new YabFetch(requestInit);

  const currentFetch = yabFetch.fetch as YabFetcher<unknown>;

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

  currentFetch.use = yabFetch.use;

  return currentFetch;
}
