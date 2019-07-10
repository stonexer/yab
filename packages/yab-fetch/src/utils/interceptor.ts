import { YabRequestInit } from '../types/index';

export interface YabFetchInit {
  url: string;
  init: YabRequestInit;
}

export type RequestInterceptor = (req: YabFetchInit) => YabFetchInit;

export type ResponseInterceptor = (
  req: YabFetchInit,
  res?: Promise<Response>
) => Promise<Response>;

export class InterceptorManager<
  T extends RequestInterceptor | ResponseInterceptor
> {
  handlers: T[] = [];

  public use(handler: T): void {
    this.handlers.push(handler);
  }

  public applyRequest(req: YabFetchInit) {
    return this.handlers.reduce((acc, handler) => handler(acc) as any, req);
  }

  public applyResponse(req: YabFetchInit, res: Promise<Response>) {
    return this.handlers.reduce(
      (acc, handler) => handler(req, acc) as any,
      res
    );
  }
}
