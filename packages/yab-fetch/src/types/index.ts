import { Method } from '../utils/method';

export type RequestHeaders = Record<string, string> | undefined;

export type RequestParams = Record<string, string> | undefined;

export interface YabRequestInit extends RequestInit {
  baseURL?: string;
  params?: RequestParams;
  data?: unknown;
  url?: string;
  contentType?: 'json' | 'text';
  resolveData?(context: IYabFetchContext): Promise<unknown>;
  onError?(err: Error): unknown;
}

export interface ExcutableYabRequestInit extends YabRequestInit {
  url: string;
  contentType: 'json' | 'text';
  onError(err: Error): unknown;
}

export interface YabFetcher<TFetchResult> {
  (url: string, init?: YabRequestInit): Promise<TFetchResult>;
  get(url: string, config?: YabRequestInit): Promise<TFetchResult>;
  delete(url: string, config?: YabRequestInit): Promise<TFetchResult>;
  post(
    url: string,
    data?: unknown,
    config?: YabRequestInit
  ): Promise<TFetchResult>;
  put(
    url: string,
    data?: unknown,
    config?: YabRequestInit
  ): Promise<TFetchResult>;
  patch(
    url: string,
    data?: unknown,
    config?: YabRequestInit
  ): Promise<TFetchResult>;
  use(middlware: YabFetchMiddleware): void;
}

export type MethodType = keyof typeof Method;

export interface IYabFetchContext {
  // **Request**
  yabRequestInit: YabRequestInit;

  // **Response**
  response: Response;

  [key: string]: any;
}

export type YabFetchMiddleware = (
  context: IYabFetchContext,
  next: () => Promise<unknown>
) => void;
