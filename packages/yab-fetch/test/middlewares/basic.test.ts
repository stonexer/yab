import 'whatwg-fetch';

import { createFetch } from '../../src/yabFetch';
import { IYabFetchContext } from '../../src/types';

test('middleware: json', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  // TODO: fix type
  interface YabFetchContextWithJSON extends IYabFetchContext {
    json: {
      data: string;
    };
  }

  const fetcher = createFetch({
    resolveData: async (context: YabFetchContextWithJSON) => {
      return context.json;
    }
  });

  fetcher.use(async (context: any, next) => {
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

  // TODO: fix type
  interface YabFetchContextWithData extends IYabFetchContext {
    data: string;
  }

  const fetcher = createFetch({
    resolveData: async (context: YabFetchContextWithData) => {
      return context.data;
    }
  });

  fetcher.use(async (context: any, next) => {
    await next();
    const json = await context.response.json();
    context.data = json.data;
  });

  const result = await fetcher('github.com');

  expect(result).toEqual('data');
});
