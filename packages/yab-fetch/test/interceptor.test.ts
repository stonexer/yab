import 'whatwg-fetch';
import { createFetch } from '../src/index';
import {
  RequestInterceptor,
  InterceptorManager,
  YabFetchParams
} from '../src/utils/interceptor';

test('interceptor.init', () => {
  const interceptor = new InterceptorManager();
  // logger
  interceptor.use((({ url, init }) => {
    return { url, init };
  }) as RequestInterceptor);

  // modify
  interceptor.use(({ url, init }: YabFetchParams) => {
    return { url: `${url}/test`, init: { ...init, a: 2 } };
  });

  expect(interceptor.handlers.length).toBe(2);

  const result = interceptor.apply({
    url: 'url',
    init: {}
  });
  expect(result).toEqual(['url/test', { a: 2 }]);
});

test('interceptor.withFetch', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response()));

  const fetcher = createFetch();

  const requestInterceptor: RequestInterceptor = ({ url, init }) => {
    return { url, init };
  };

  fetcher.interceptor.request.use(requestInterceptor);

  fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual(['github.com/test', {}]);
});
