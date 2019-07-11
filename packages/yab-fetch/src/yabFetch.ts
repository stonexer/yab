import {
  YabRequestInit,
  YabFetcher,
  MethodType,
  CreateYabRequestInit,
  RequestInterceptor,
  ResponseInterceptor
} from './types/index';
import { getYabRequestInit, getRequestInit } from './utils/index';

import { InterceptorManager } from './utils/interceptor';

function defaultErrorHandler(err: Error): Error {
  // eslint-disable-next-line no-console
  console.error(`Error in yab-fetch`, err);
  throw err;
}

export function createFetch<TResponseType>(
  requestInit: CreateYabRequestInit
): YabFetcher<TResponseType> {
  const browserFetch = window.fetch;
  const requestInterceptor = new InterceptorManager<RequestInterceptor>();
  const responseInterceptor = new InterceptorManager<ResponseInterceptor>();

  const currentFetch = ((url: string, directOptions?: YabRequestInit) => {
    const yabRequestInit = getYabRequestInit(
      {
        onError: defaultErrorHandler
      },
      requestInit,
      directOptions,
      { url }
    );

    const fetchRequest = requestInterceptor.applyRequest(yabRequestInit);

    return browserFetch(fetchRequest.url, getRequestInit(fetchRequest)).then(
      yabRequestInit.resolveData,
      yabRequestInit.onError
    );
  }) as YabFetcher<TResponseType>;

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
