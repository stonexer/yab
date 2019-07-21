export interface YabRequestInit extends RequestInit {
  url: string;
}

export interface IYabFetchContext {
  // **Request**
  yabRequestInit: YabRequestInit;

  // **Response**
  response: Response;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json?: any;
  text?: string;
}

export type Middleware = (
  context: IYabFetchContext,
  next: () => Promise<unknown>
) => void;

export interface CacheOptions {
  cache?: CacheStorage;
}

export interface CacheStorage {
  init(): Promise<void>;
  get(key: string): Promise<unknown>;
  set(key: string, value: object): Promise<unknown>;
}
