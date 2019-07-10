import 'whatwg-fetch';

import { createFetch } from '../../src/yabFetch';

test('middleware: json', async () => {
  let lock = false;

  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch();

  fetcher.use(async (context, next) => {
    console.log('Before 1');
    await next();
    console.log('After 1');
  });

  fetcher.use(async (context, next) => {
    const retry = async () => {
      await next();
    }
    console.log('Before 2');
    await next();
    console.log('After 2');
    if (!lock) {
      lock = true;
      await retry();
    }
  });

  fetcher.use(async (context, next) => {
    console.log('Before 3');
    await next();
    console.log('After 3');
  });

  const result = await fetcher('github.com');
});
