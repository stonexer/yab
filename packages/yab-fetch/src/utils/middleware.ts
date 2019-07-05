import { YabRequestInit } from '../types/index';

export interface YabFetchParams {
  url: string;
  init: YabRequestInit;
}

export type Middleware = (url: string, init: YabRequestInit) => YabFetchParams;

