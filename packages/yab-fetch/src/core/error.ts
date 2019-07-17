import { ExcutableYabRequestInit } from '../types';

interface YabFetchErrorOptions {
  error?: Error;
  errorMessage?: string;
  yabRequestInit: ExcutableYabRequestInit;
  requestInit: RequestInit;
  response?: Response;
}

export interface YabFetchError extends Error {
  yabRequestInit: ExcutableYabRequestInit;
  requestInit: RequestInit;
  response?: Response;
}

export function createError(options: YabFetchErrorOptions): YabFetchError {
  const error = (options.error ||
    new Error(options.errorMessage)) as YabFetchError;

  Object.assign(error, {
    yabRequestInit: options.yabRequestInit,
    requestInit: options.requestInit,
    response: options.response
  });

  return error;
}
