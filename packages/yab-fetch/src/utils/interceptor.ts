import {
  ExecutableYabRequestInit,
  RequestInterceptor,
  ResponseInterceptor
} from '../types/index';

export class InterceptorManager<
  T extends RequestInterceptor | ResponseInterceptor
> {
  private handlers: T[] = [];

  public use(handler: T): void {
    this.handlers.push(handler);
  }

  public applyRequest(req: ExecutableYabRequestInit): ExecutableYabRequestInit {
    // TODO: resolve type warning
    return this.handlers.reduce((acc, handler) => handler(acc) as any, req);
  }

  public applyResponse(req: ExecutableYabRequestInit, res: Promise<Response>) {
    return this.handlers.reduce(
      // TODO: resolve type warning
      (acc, handler) => handler(req, acc) as any,
      res
    );
  }
}
