import {
  CacheOptions,
  Middleware,
  IYabFetchContext,
  CacheStorage
} from './types/index';
import createIDBCache from './idb';

function createCacheMiddleware(options: CacheOptions = {}): Middleware {
  const store: CacheStorage = options.cache || createIDBCache();

  return async (ctx: IYabFetchContext, next: () => Promise<unknown>) => {
    const { url } = ctx.yabRequestInit;
    const cacheData = await store.get(url);

    if (cacheData) {
      ctx.json = cacheData;

      return;
    }

    await next();

    store.set(url, ctx.json);
  };
}

export default createCacheMiddleware;
