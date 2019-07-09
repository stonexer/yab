import { YabRequestInit, YabFetcher, MethodType } from './types/index';
import { getYabRequestInit, createURL, getRequestInit } from './utils/index';

import {
  RequestInterceptor,
  ResponseInterceptor,
  InterceptorManager
} from './utils/interceptor';

function defaultErrorHandler(err: Error): Error {
  // eslint-disable-next-line no-console
  console.error(`Error in yab-fetch`, err);
  throw err;
}

export function createFetch(requestInit?: YabRequestInit): YabFetcher {
  const browserFetch = window.fetch;
  const requestInterceptor = new InterceptorManager<RequestInterceptor>();
  const responseInterceptor = new InterceptorManager<ResponseInterceptor>();

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

    try {
      const fetchRequest = requestInterceptor.applyRequest({
        url,
        init: getRequestInit(yabRequestInit)
      });

      const res = browserFetch(fetchRequest.url, fetchRequest.init);
      return responseInterceptor.applyResponse(res, fetchRequest);
    } catch (err) {
      return defaultErrorHandler(err);
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

  // 扩展对象上方法，便于添加 interceptor
  currentFetch.interceptor = {
    request: {
      use: (...handlers) => {
        handlers.forEach((handler) => requestInterceptor.use(handler));
      }
    },
    response: {
      use: (...handlers) => {
        handlers.forEach((handler) => responseInterceptor.use(handler));
      }
    }
  };

  return currentFetch;
}
