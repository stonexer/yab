// eslint-disable-next-line import/no-extraneous-dependencies
import { IYabFetchContext, YabFetchMiddleware } from 'yab-fetch';
import { Options } from './type';

export const createLogger = (options: Options): YabFetchMiddleware => {
  const { color } = options;

  return async (ctx: IYabFetchContext, next: () => Promise<unknown>) => {
    console.log('ctx before:', ctx);
    await next();
    console.log('ctx after:', ctx);
  };
};
