import 'whatwg-fetch';

import { InterceptorManager } from '../src/utils/interceptor';

test('interceptor.init', () => {
  const interceptor = new InterceptorManager();

  // logger
  interceptor.use((url, init) => {
    return [url, init];
  });

  // modify
  interceptor.use((url, init) => {
    return [`${url}/test`, { ...init, a: 2 }];
  });

  expect(interceptor.handlers.length).toBe(2);

  const result = interceptor.apply('url', { a: 1 });
  expect(result).toEqual(['url/test', { a: 2 }]);
});
