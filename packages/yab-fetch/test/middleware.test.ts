import 'whatwg-fetch';

import { createFetch } from '../src/yabFetch';

test('middleware', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response()));

  const fetcher = createFetch();

  fetcher.useMiddlewares((url, init) => {
    return {
      url: `${url}/middleware`,
      init
    };
  });

  fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual([
    'github.com/middleware',
    {}
  ]);
});
