import 'whatwg-fetch';

import { createFetch } from '../../src/core/fetch';
import { IYabFetchContext } from '../../src/types';

test('resolve: json', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch({
    resolveData: async (context: IYabFetchContext) => {
      return context.json;
    }
  });

  const result = await fetcher('github.com');

  expect(result).toEqual({ data: 'data' });
});

test('get/set context inside middleware', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch();

  fetcher.use(async (context, next) => {
    expect(context.yabRequestInit).toBeDefined();
    expect(context.yabRequestInit.url).toEqual('github.com');

    context.yabRequestInit.contentType = 'json';
    expect(context.yabRequestInit.contentType).toEqual('json');

    await next();

    expect(context.json).toEqual({ data: 'data' });

    context.success = true;
    expect(context.success).toEqual(true);
  });

  await fetcher('github.com');
});

test('middleware: json', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch({
    resolveData: async (context: IYabFetchContext) => {
      return context.json;
    }
  });

  fetcher.use(async (context, next) => {
    await next();
    context.json = await context.response.json();
  });

  const result = await fetcher('github.com');

  expect(result).toEqual({ data: 'data' });
});

test('middleware: data', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch({
    async resolveData(context: IYabFetchContext) {
      return context.data;
    }
  });

  fetcher.use(async (context, next) => {
    await next();
    const json = await context.response.json();
    context.data = json.data;
  });

  const result = await fetcher('github.com');

  expect(result).toEqual('data');
});
