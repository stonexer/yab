import { YabRequestInit } from '../types/index';

export interface YabFetchParams {
  url: string;
  init: YabRequestInit;
}

export interface InterceptorManager {
  interceptor: Set<Interceptor>;
}

// TODO: 入参即出参
export type Interceptor = (...args: any) => any[];

export class InterceptorManager {
  handlers: Interceptor[] = [];

  public use(handler: Interceptor): void {
    this.handlers.push(handler);
  }

  public eject(): void {
    this.handlers.pop();
  }

  // excute order, from left
  public apply(...args: any) {
    return this.handlers
      .reverse()
      .reduce((acc, handle: Interceptor) => handle(...acc), args);
  }
}
