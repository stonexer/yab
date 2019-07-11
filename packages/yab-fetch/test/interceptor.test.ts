import 'whatwg-fetch';
import { createFetch } from '../src/index';
import { RequestInterceptor, ExecutableYabRequestInit } from '../src/types';
import { InterceptorManager } from '../src/utils/interceptor';

test('interceptor.request.init', () => {
  const interceptor = new InterceptorManager<RequestInterceptor>();
  // logger
  interceptor.use(((request) => {
    console.log('logger:', request);
    return request;
  }) as RequestInterceptor);

  // modify
  interceptor.use((request) => {
    const { url } = request;

    return { ...request, url: `${url}/test` };
  });

  const onError = (err: Error) => console.error(`${err}`);

  const result = interceptor.applyRequest({
    url: 'url',
    onError
  });

  expect(result).toEqual({
    url: 'url/test',
    onError
  });
});

test('interceptor.withFetch', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response()));

  const fetcher = createFetch({
    resolveData: (response: Response) => response.json()
  });

  const requestInterceptor: RequestInterceptor = (response) => {
    return { ...response, url: `${response.url}/test` };
  };

  fetcher.interceptor.request.use(requestInterceptor);

  fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual(['github.com/test', {}]);
});
