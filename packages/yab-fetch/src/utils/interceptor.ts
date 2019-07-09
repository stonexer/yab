import { YabRequestInit } from '../types/index';

export interface YabFetchParams {
  url: string;
  init: YabRequestInit;
}

export type RequestInterceptor = (res: YabFetchParams) => YabFetchParams;

export type ResponseInterceptor = (
  res: Promise<Response>,
  req: YabFetchParams
) => Promise<Response>;

export class InterceptorManager<T> {
  handlers: T[] = [];

  public use(handler: T): void {
    this.handlers.push(handler);
  }

  public applyRequest(res: YabFetchParams) {
    return this.handlers.reduce((acc, handler) => handler(acc), res);
  }

  public applyResponse(res: Promise<Response>, req: YabFetchParams) {
    return this.handlers.reduce((acc, handler) => handler(acc, req), res);
  }
}
