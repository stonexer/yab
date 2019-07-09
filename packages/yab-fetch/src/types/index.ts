import { Method } from '../utils/method';

export type RequestHeaders = Record<string, string> | undefined;

export type RequestParams = Record<string, string> | undefined;

export interface YabRequestInit extends RequestInit {
  baseURL?: string;
  params?: RequestParams;
  data?: unknown;
  url?: string;
  contentType?: 'json' | 'text';
  resolveData?(data: Response): Promise<unknown>;
  onError?(err: Error): unknown;
}

export interface ExcutableYabRequestInit extends YabRequestInit {
  url: string;
  contentType: 'json' | 'text';
  onError(err: Error): unknown;
}

export interface YabFetcher<TResponseType> {
  (url: string, init?: YabRequestInit): Promise<TResponseType>;
  get(url: string, config?: YabRequestInit): Promise<TResponseType>;
  delete(url: string, config?: YabRequestInit): Promise<TResponseType>;
  post(
    url: string,
    data?: unknown,
    config?: YabRequestInit
  ): Promise<TResponseType>;
  put(
    url: string,
    data?: unknown,
    config?: YabRequestInit
  ): Promise<TResponseType>;
  patch(
    url: string,
    data?: unknown,
    config?: YabRequestInit
  ): Promise<TResponseType>;
}

export type MethodType = keyof typeof Method;
