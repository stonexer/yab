import { YabRequestInit, YabFetcher, MethodType } from './types/index';
import { getYabRequestInit, getRequestInit } from './utils/index';
import { getPickUpResolver } from './resolvers/index';
import { defaultErrorHandler } from './resolvers/default';

const DEFAULT_INIT: YabRequestInit = {
  contentType: 'json',
  onError: defaultErrorHandler
};

export function createFetch<TResponseType>(
  requestInit?: YabRequestInit & {
    resolveData?(res: Response): Promise<TResponseType>;
  }
): YabFetcher<TResponseType> {
  const browserFetch = window.fetch;

  const currentFetch = ((url: string, directOptions?: YabRequestInit) => {
    const yabRequestInit = getYabRequestInit(
      { ...DEFAULT_INIT },
      requestInit,
      directOptions,
      { url }
    );

    const pickUpResolver = getPickUpResolver(yabRequestInit);

    return browserFetch(
      yabRequestInit.url,
      getRequestInit(yabRequestInit)
    ).then(pickUpResolver, yabRequestInit.onError);
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

  return currentFetch;
}
